import { json } from '@sveltejs/kit';
import { getSheet } from '$lib/data/api';
import { parseEvents, type MigrationEvent } from '$lib/data/irmc';
import type { RequestHandler } from './$types';

// Endpoint público (con CORS) para el contador del widget "La Travesía"
// embebido en eltoque.com. Devuelve muertes y desapariciones para los tres
// periodos del widget. Como dos de ellos son ventanas móviles relativas a
// "hoy" (últimos 12 meses / últimos 30 días), el servidor las resuelve con la
// fecha exacta de cada evento — el cliente no hace cálculos de fechas.
//
// Fuente: hoja `Todos los eventos`. Cada evento aporta su nº de personas
// fallecidas (col. O) y desaparecidas (col. P), ya parseadas por parseEvents
// como `deaths` y `missingsNo`. Es la misma fuente que alimenta el titular del
// sitio, de modo que las cifras coinciden con /personas.
export const prerender = false;

const START_YEAR = 2014;

const CORS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
};

const ymd = (ms: number) => new Date(ms).toISOString().slice(0, 10);

const sumFrom = (events: MigrationEvent[], fromMs: number) =>
	events.reduce(
		(acc, e) => {
			if (e.date!.getTime() < fromMs) return acc;
			acc.deaths += e.deaths || 0;
			acc.missing += e.missingsNo || 0;
			return acc;
		},
		{ deaths: 0, missing: 0 }
	);

export const OPTIONS: RequestHandler = () => new Response(null, { headers: CORS });

export const GET: RequestHandler = async () => {
	const now = new Date();
	const nowMs = now.getTime();

	// Límites de cada ventana.
	const startMs = Date.UTC(START_YEAR, 0, 1); // "Desde 2014"
	const last12Ms = Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate()); // 12 meses
	const last30Ms = nowMs - 30 * 24 * 60 * 60 * 1000; // 30 días

	const { data } = await getSheet('Todos los eventos');
	const events = parseEvents(data.values?.slice(1)).filter((e) => {
		const t = e.date!.getTime();
		return t >= startMs && t <= nowMs; // descarta fechas futuras o anteriores a 2014
	});

	return json(
		{
			asOf: ymd(nowMs),
			startYear: START_YEAR,
			periods: {
				all: { label: 'Desde 2014', since: ymd(startMs), ...sumFrom(events, startMs) },
				last12Months: { label: 'Último año', since: ymd(last12Ms), ...sumFrom(events, last12Ms) },
				last30Days: { label: 'Último mes', since: ymd(last30Ms), ...sumFrom(events, last30Ms) }
			}
		},
		{ headers: { ...CORS, 'Cache-Control': 'public, max-age=300' } }
	);
};
