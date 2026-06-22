import { json } from '@sveltejs/kit';
import { getSheet } from '$lib/data/api';
import { computeMonthlyIrmc, parseEvents } from '$lib/data/irmc';
import { buildMonthReport } from '$lib/data/irmc-report';
import type { RequestHandler } from './$types';

export const prerender = false;

const SPREADSHEET_ID = '1rb96kgAuMVclENWvoZTXtXfN1pqWYdT8EifWkprBMMQ';
const START_YEAR = 2021;

const CORS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
};

export const OPTIONS: RequestHandler = () => new Response(null, { headers: CORS });

export const GET: RequestHandler = async () => {
	const now = new Date();
	const endCutoff = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59);

	const { data } = await getSheet('Todos los eventos');
	const rows = data.values?.slice(1);
	const events = parseEvents(rows).filter((e) => {
		const t = e.date!.getTime();
		return t >= Date.UTC(START_YEAR, 0, 1) && t <= endCutoff;
	});

	const series = computeMonthlyIrmc(events);
	if (!series.length) {
		return json({ error: 'Sin datos disponibles.' }, { status: 404, headers: CORS });
	}

	const last = series[series.length - 1];
	const report = buildMonthReport(events, last.year, last.month, {
		spreadsheetId: SPREADSHEET_ID,
		source: 'Google Sheets: "Todos los eventos" (Incidentes de La Travesía)'
	});

	return json(report, {
		headers: { ...CORS, 'Cache-Control': 'public, max-age=300' }
	});
};
