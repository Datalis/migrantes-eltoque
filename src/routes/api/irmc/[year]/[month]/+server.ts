import { json } from '@sveltejs/kit';
import { getSheet } from '$lib/data/api';
import { parseEvents } from '$lib/data/irmc';
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

export const GET: RequestHandler = async ({ params }) => {
	const year = parseInt(params.year || '', 10);
	const month = parseInt(params.month || '', 10);

	if (!year || !month || month < 1 || month > 12) {
		return json(
			{
				error: 'Parámetros inválidos.',
				usage: '/api/irmc/{year}/{month} con year (>= 2021) y month entre 1 y 12.'
			},
			{ status: 400, headers: CORS }
		);
	}

	const now = new Date();
	const endCutoff = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59);
	const reqDate = Date.UTC(year, month - 1, 15);

	if (year < START_YEAR || reqDate > endCutoff) {
		return json(
			{
				error: 'Periodo fuera de rango.',
				validRange: {
					from: `${START_YEAR}-01`,
					to: `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`
				}
			},
			{ status: 404, headers: CORS }
		);
	}

	const { data } = await getSheet('Todos los eventos');
	const rows = data.values?.slice(1);
	const events = parseEvents(rows).filter((e) => {
		const t = e.date!.getTime();
		return t >= Date.UTC(START_YEAR, 0, 1) && t <= endCutoff;
	});

	const report = buildMonthReport(events, year, month, {
		spreadsheetId: SPREADSHEET_ID,
		source: 'Google Sheets: "Todos los eventos" (Incidentes de La Travesía)'
	});

	if (!report) {
		return json({ error: 'No hay eventos clasificables para ese mes.' }, { status: 404, headers: CORS });
	}

	return json(report, {
		headers: { ...CORS, 'Cache-Control': 'public, max-age=300' }
	});
};
