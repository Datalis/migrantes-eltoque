import { json } from '@sveltejs/kit';
import { getSheet } from '$lib/data/api';
import { parseEvents, type MigrationEvent } from '$lib/data/irmc';
import type { RequestHandler } from './$types';

// Endpoint público (con CORS) para el contador del widget "La Travesía"
// embebido en eltoque.com. Tiene dos modos sobre la misma ruta:
//
//   1. Sin parámetros  ->  los tres periodos fijos del widget (Desde 2014 /
//      último año / último mes). Dos son ventanas móviles relativas a "hoy",
//      que el servidor resuelve con la fecha exacta de cada evento.
//
//   2. Con `from`/`to` (YYYY-MM-DD)  ->  rango de fechas personalizado, para
//      los campos de fecha inicio/fin del widget. Rango inclusivo; cada
//      parámetro es opcional (sin `from` no hay límite inferior, sin `to` no
//      hay superior).
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

/**
 * Parsea una fecha `YYYY-MM-DD` (formato del input date del widget) a un
 * timestamp UTC. `endOfDay` la lleva al final del día para que el rango sea
 * inclusivo en ambos extremos. Devuelve `null` si el formato es inválido.
 */
function parseParamDate(value: string | null, endOfDay = false): number | null {
	if (!value) return null;
	const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!m) return null;
	const [, y, mo, d] = m.map(Number);
	const ts = endOfDay
		? Date.UTC(y, mo - 1, d, 23, 59, 59, 999)
		: Date.UTC(y, mo - 1, d, 0, 0, 0, 0);
	return isNaN(ts) ? null : ts;
}

export const OPTIONS: RequestHandler = () => new Response(null, { headers: CORS });

export const GET: RequestHandler = async ({ url }) => {
	const fromParam = url.searchParams.get('from');
	const toParam = url.searchParams.get('to');

	const { data } = await getSheet('Todos los eventos');
	const rows = data.values?.slice(1);

	// --- Modo 2: rango de fechas personalizado (from/to) ---
	if (fromParam !== null || toParam !== null) {
		const from = parseParamDate(fromParam);
		const to = parseParamDate(toParam, true);

		if ((fromParam && from === null) || (toParam && to === null)) {
			return json(
				{ error: 'Parámetros de fecha inválidos. Use el formato YYYY-MM-DD.' },
				{ status: 400, headers: CORS }
			);
		}
		if (from !== null && to !== null && from > to) {
			return json(
				{ error: 'La fecha de inicio no puede ser posterior a la fecha de fin.' },
				{ status: 400, headers: CORS }
			);
		}

		const events = parseEvents(rows).filter((e) => {
			const t = e.date!.getTime();
			return (from === null || t >= from) && (to === null || t <= to);
		});

		let muertes = 0;
		let desapariciones = 0;
		for (const e of events) {
			muertes += e.deaths;
			desapariciones += e.missingsNo;
		}

		return json(
			{
				from: fromParam ?? null,
				to: toParam ?? null,
				muertes,
				desapariciones,
				events: events.length
			},
			{ headers: { ...CORS, 'Cache-Control': 'public, max-age=300' } }
		);
	}

	// --- Modo 1: periodos fijos (sin parámetros) ---
	const now = new Date();
	const nowMs = now.getTime();

	// Límites de cada ventana.
	const startMs = Date.UTC(START_YEAR, 0, 1); // "Desde 2014"
	const last12Ms = Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate()); // 12 meses
	const last30Ms = nowMs - 30 * 24 * 60 * 60 * 1000; // 30 días

	const events = parseEvents(rows).filter((e) => {
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
