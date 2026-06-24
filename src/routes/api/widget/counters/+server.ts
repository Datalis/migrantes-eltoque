import { json } from '@sveltejs/kit';
import { getSheet } from '$lib/data/api';
import { parseEvents } from '$lib/data/irmc';
import type { RequestHandler } from './$types';

// Endpoint público (con CORS) para el widget "La Travesía" embebido en
// eltoque.com. Devuelve el contador de muertes y desapariciones agregado por
// año, para que el widget resuelva los presets de periodo ("Desde 2014",
// "Este año", "Últimos 3 años") en cliente con una sola petición.
//
// Fuente: hoja `Todos los eventos`. Cada evento aporta su nº de personas
// fallecidas (col. O) y desaparecidas (col. P) — ya parseadas por parseEvents
// como `deaths` y `missingsNo`. Es la misma fuente que alimenta el titular del
// sitio, de modo que las cifras coinciden con /personas.
export const prerender = false;

const START_YEAR = 2014;

const CORS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
};

const parseYear = (v: string | null): number | null => {
	if (!v) return null;
	const n = parseInt(v, 10);
	return Number.isInteger(n) && n >= 2000 && n <= 2100 ? n : null;
};

export const OPTIONS: RequestHandler = () => new Response(null, { headers: CORS });

export const GET: RequestHandler = async ({ url }) => {
	const now = new Date();
	const currentYear = now.getUTCFullYear();

	const { data } = await getSheet('Todos los eventos');
	const rows = data.values?.slice(1);
	const events = parseEvents(rows);

	// Agregado por año (solo eventos con fecha válida; parseEvents descarta el resto).
	const byYear: Record<string, { deaths: number; missing: number }> = {};
	for (const e of events) {
		const year = e.date!.getUTCFullYear();
		if (year < START_YEAR || year > currentYear) continue;
		const key = String(year);
		const bucket = byYear[key] ?? { deaths: 0, missing: 0 };
		bucket.deaths += e.deaths || 0;
		bucket.missing += e.missingsNo || 0;
		byYear[key] = bucket;
	}

	// Filtro opcional por rango de años (?from=YYYY&to=YYYY). Si no se indica,
	// el total abarca desde START_YEAR hasta el año en curso.
	const from = parseYear(url.searchParams.get('from')) ?? START_YEAR;
	const to = parseYear(url.searchParams.get('to')) ?? currentYear;

	const total = { deaths: 0, missing: 0 };
	for (const [key, b] of Object.entries(byYear)) {
		const year = +key;
		if (year < from || year > to) continue;
		total.deaths += b.deaths;
		total.missing += b.missing;
	}

	return json(
		{
			range: { from, to, startYear: START_YEAR, currentYear },
			total,
			byYear
		},
		{ headers: { ...CORS, 'Cache-Control': 'public, max-age=300' } }
	);
};
