import { json } from '@sveltejs/kit';
import { getSheet } from '$lib/data/api';
import {
	computeMonthlyIrmc,
	parseEvents,
	resolveTypes,
	severityOf,
	type MigrationEvent
} from '$lib/data/irmc';
import type { RequestHandler } from './$types';

export const prerender = false;

const START_YEAR = 2021;

const CORS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
};

const MONTH_NAMES_ES = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre'
];

const round2 = (n: number) => Math.round(n * 100) / 100;
const formatES = (n: number) =>
	round2(n).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const ym = (year: number, month: number) => `${year}-${String(month).padStart(2, '0')}`;

const parseYM = (s: string | null): { year: number; month: number } | null => {
	if (!s) return null;
	const m = s.match(/^(\d{4})-(\d{1,2})$/);
	if (!m) return null;
	const year = parseInt(m[1], 10);
	const month = parseInt(m[2], 10);
	if (!year || month < 1 || month > 12) return null;
	return { year, month };
};

const buildItem = (
	monthly: ReturnType<typeof computeMonthlyIrmc>[number],
	events: MigrationEvent[]
) => {
	const monthEvents = events.filter(
		(e) =>
			e.date &&
			e.date.getUTCFullYear() === monthly.year &&
			e.date.getUTCMonth() + 1 === monthly.month &&
			severityOf(e.eventType) !== null
	);
	const people = monthEvents.reduce((s, e) => s + (e.personsNo || 0), 0);

	// Un incidente con doble clasificación cuenta en cada tipo; sus personas se
	// atribuyen sólo al tipo de mayor severidad para no contarlas doble.
	const byTypeMap = new Map<
		string,
		{ type: string; label: string; severity: number; events: number; people: number }
	>();
	for (const e of monthEvents) {
		const types = resolveTypes(e.eventType);
		const isSingle = types.length === 1;
		const primary = types.reduce((a, b) => (b.s > a.s ? b : a), types[0]);
		for (const { type, s } of types) {
			let entry = byTypeMap.get(type);
			if (!entry) {
				entry = {
					type,
					label: isSingle
						? (e.eventType || '').charAt(0).toUpperCase() + (e.eventType || '').slice(1).trim()
						: type.charAt(0).toUpperCase() + type.slice(1),
					severity: s,
					events: 0,
					people: 0
				};
				byTypeMap.set(type, entry);
			}
			entry.events += 1;
			if (type === primary.type) entry.people += e.personsNo || 0;
		}
	}
	const byType = [...byTypeMap.values()].sort((a, b) => b.events - a.events);

	return {
		period: {
			year: monthly.year,
			month: monthly.month,
			monthName: MONTH_NAMES_ES[monthly.month - 1],
			monthLabel: `${MONTH_NAMES_ES[monthly.month - 1].toLowerCase()} de ${monthly.year}`,
			key: ym(monthly.year, monthly.month)
		},
		irmc: {
			value: round2(monthly.irmc),
			valueFormatted: formatES(monthly.irmc),
			level: monthly.classification.level,
			levelLabel: monthly.classification.label,
			color: monthly.classification.color
		},
		totals: { events: monthly.n, people, excludedEvents: monthly.excludedCount },
		byType
	};
};

export const OPTIONS: RequestHandler = () => new Response(null, { headers: CORS });

export const GET: RequestHandler = async ({ url }) => {
	const now = new Date();
	const endCutoff = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59);

	const from = parseYM(url.searchParams.get('from'));
	const to = parseYM(url.searchParams.get('to'));
	const lastRaw = url.searchParams.get('last');
	const last = lastRaw ? parseInt(lastRaw, 10) : 0;

	const { data } = await getSheet('Todos los eventos');
	const rows = data.values?.slice(1);
	const events = parseEvents(rows).filter((e) => {
		const t = e.date!.getTime();
		return t >= Date.UTC(START_YEAR, 0, 1) && t <= endCutoff;
	});

	const series = computeMonthlyIrmc(events);

	let filtered = series.filter((m) => {
		if (from && (m.year < from.year || (m.year === from.year && m.month < from.month)))
			return false;
		if (to && (m.year > to.year || (m.year === to.year && m.month > to.month))) return false;
		return true;
	});
	if (last > 0) filtered = filtered.slice(-last);

	const items = filtered.map((m) => buildItem(m, events));

	return json(
		{
			range: {
				from: items.length ? items[0].period.key : null,
				to: items.length ? items[items.length - 1].period.key : null
			},
			count: items.length,
			items
		},
		{ headers: { ...CORS, 'Cache-Control': 'public, max-age=300' } }
	);
};
