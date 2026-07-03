/**
 * Reporte mensual del IRMC pensado para consumo por herramientas externas
 * (LLM/automatización). Agrega los datos necesarios para construir la nota
 * mensual: índice y nivel, totales, comparación con el mes anterior, desglose
 * por tipo de evento, composición demográfica y distribución territorial.
 */

import {
	computeMonthlyIrmc,
	labelForType,
	resolveTypes,
	severityOf,
	type MigrationEvent,
	type Severity
} from './irmc';

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

const SEVERITY_LEVELS: Record<Severity, 'baja' | 'media' | 'alta'> = {
	1: 'baja',
	2: 'media',
	3: 'alta'
};

const DEATH_TYPES = new Set([
	'muerte',
	'muertes',
	'naufragio',
	'hallazgo de cadaver',
	'violencia letal'
]);
const MISSING_TYPES = new Set(['desaparicion', 'desapariciones']);

export interface ReportPeriod {
	year: number;
	month: number;
	monthName: string;
	monthLabel: string;
}

export interface ReportIrmc {
	value: number;
	valueFormatted: string;
	raw: number;
	level: 'bajo' | 'moderado' | 'alto' | 'extremo';
	levelLabel: string;
	color: string;
}

export interface ReportTotals {
	events: number;
	people: number;
	excludedEvents: number;
}

export interface ReportTypeBreakdown {
	type: string;
	label: string;
	severity: Severity;
	severityLevel: 'baja' | 'media' | 'alta';
	events: number;
	people: number;
}

export interface ReportCountry {
	name: string;
	events: number;
	people: number;
}

export interface IrmcReport {
	period: ReportPeriod;
	irmc: ReportIrmc;
	totals: ReportTotals;
	previous: {
		period: ReportPeriod;
		irmc: Omit<ReportIrmc, 'raw' | 'color'>;
		totals: { events: number; people: number };
	} | null;
	trend: {
		irmc: 'aumentó' | 'disminuyó' | 'se mantuvo';
		irmcDelta: number;
		events: 'aumentó' | 'disminuyó' | 'se mantuvo';
		eventsDelta: number;
		people: 'aumentó' | 'disminuyó' | 'se mantuvo';
		peopleDelta: number;
		peopleVarPercent: number | null;
		peopleVarPercentFormatted: string | null;
	} | null;
	byType: ReportTypeBreakdown[];
	demographics: {
		men: number;
		women: number;
		minors: number;
		totalIdentified: number;
	};
	geography: {
		countries: ReportCountry[];
		topByEvents: { name: string; events: number } | null;
		topByPeople: { name: string; people: number } | null;
		divergentTops: boolean;
		locations: string[];
		deathCountries: string[];
		missingCountries: string[];
	};
	classification: {
		ranges: { level: string; label: string; min: number; max: number }[];
	};
	excluded: {
		count: number;
		events: {
			id: number | null;
			date: string | null;
			type: string | null;
			country: string | null;
			location: string | null;
			name: string | null;
			description: string | null;
		}[];
	};
	meta: {
		source: string;
		generatedAt: string;
		spreadsheetId: string;
	};
}

const round2 = (n: number) => Math.round(n * 100) / 100;

const formatES = (n: number) =>
	round2(n).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const direction = (a: number, b: number): 'aumentó' | 'disminuyó' | 'se mantuvo' => {
	if (a > b) return 'aumentó';
	if (a < b) return 'disminuyó';
	return 'se mantuvo';
};

const periodOf = (year: number, month: number): ReportPeriod => ({
	year,
	month,
	monthName: MONTH_NAMES_ES[month - 1],
	monthLabel: `${MONTH_NAMES_ES[month - 1].toLowerCase()} de ${year}`
});

const inMonth = (e: MigrationEvent, year: number, month: number) =>
	!!e.date && e.date.getUTCFullYear() === year && e.date.getUTCMonth() + 1 === month;

const sumField = (events: MigrationEvent[], field: keyof MigrationEvent) =>
	events.reduce((s, e) => s + (Number(e[field]) || 0), 0);

const uniqueSorted = (values: (string | null | undefined)[]) =>
	[...new Set(values.map((v) => v?.trim()).filter(Boolean) as string[])].sort((a, b) =>
		a.localeCompare(b, 'es')
	);

/**
 * Construye el reporte completo de un mes concreto. Devuelve `null` si ese
 * mes no tiene eventos clasificables.
 */
export function buildMonthReport(
	events: MigrationEvent[],
	year: number,
	month: number,
	meta: { spreadsheetId: string; source: string }
): IrmcReport | null {
	const series = computeMonthlyIrmc(events);
	const current = series.find((m) => m.year === year && m.month === month);
	if (!current) return null;

	const idx = series.indexOf(current);
	const prev = idx > 0 ? series[idx - 1] : null;

	const monthEvents = events.filter((e) => inMonth(e, year, month));
	const classified = monthEvents.filter((e) => severityOf(e.eventType) !== null);
	const excluded = monthEvents.filter((e) => severityOf(e.eventType) === null);

	const totals: ReportTotals = {
		events: current.n,
		people: sumField(classified, 'personsNo'),
		excludedEvents: current.excludedCount
	};

	const previousClassified = prev
		? events.filter((e) => inMonth(e, prev.year, prev.month) && severityOf(e.eventType) !== null)
		: [];
	const previousTotals = prev
		? { events: prev.n, people: sumField(previousClassified, 'personsNo') }
		: null;

	const trend =
		prev && previousTotals
			? {
					irmc: direction(current.irmc, prev.irmc),
					irmcDelta: round2(current.irmc - prev.irmc),
					events: direction(totals.events, previousTotals.events),
					eventsDelta: totals.events - previousTotals.events,
					people: direction(totals.people, previousTotals.people),
					peopleDelta: totals.people - previousTotals.people,
					peopleVarPercent:
						previousTotals.people > 0
							? Math.round(((totals.people - previousTotals.people) / previousTotals.people) * 100)
							: null,
					peopleVarPercentFormatted: (() => {
						if (!previousTotals.people) return null;
						const v = Math.round(
							((totals.people - previousTotals.people) / previousTotals.people) * 100
						);
						const sign = v > 0 ? '+' : '';
						return `${sign}${v} %`;
					})()
			  }
			: null;

	// Desglose por tipo (sólo eventos clasificados, ordenado por cantidad). Un
	// incidente con doble clasificación cuenta en cada tipo; sus personas se
	// atribuyen sólo al tipo de mayor severidad para no contarlas doble.
	const byTypeMap = new Map<string, ReportTypeBreakdown>();
	for (const e of classified) {
		const types = resolveTypes(e.eventType);
		const primary = types.reduce((a, b) => (b.s > a.s ? b : a), types[0]);
		for (const { type, s } of types) {
			let entry = byTypeMap.get(type);
			if (!entry) {
				entry = {
					type,
					label: labelForType(type),
					severity: s,
					severityLevel: SEVERITY_LEVELS[s],
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

	const demographics = {
		men: sumField(classified, 'menNo'),
		women: sumField(classified, 'womenNo'),
		minors: sumField(classified, 'childrenNo'),
		totalIdentified: 0
	};
	demographics.totalIdentified = demographics.men + demographics.women + demographics.minors;

	// Geografía.
	const countryMap = new Map<string, ReportCountry>();
	for (const e of classified) {
		const c = e.country?.trim();
		if (!c) continue;
		let entry = countryMap.get(c);
		if (!entry) {
			entry = { name: c, events: 0, people: 0 };
			countryMap.set(c, entry);
		}
		entry.events += 1;
		entry.people += e.personsNo || 0;
	}
	const countries = [...countryMap.values()].sort((a, b) => b.events - a.events);
	const topByEvents = countries[0]
		? { name: countries[0].name, events: countries[0].events }
		: null;
	const topByPeopleSrc = [...countries].sort((a, b) => b.people - a.people)[0];
	const topByPeople = topByPeopleSrc
		? { name: topByPeopleSrc.name, people: topByPeopleSrc.people }
		: null;

	const locations = uniqueSorted(classified.map((e) => e.location));
	const deathCountries = uniqueSorted(
		classified
			.filter((e) => resolveTypes(e.eventType).some((t) => DEATH_TYPES.has(t.type)))
			.map((e) => e.country)
	);
	const missingCountries = uniqueSorted(
		classified
			.filter((e) => resolveTypes(e.eventType).some((t) => MISSING_TYPES.has(t.type)))
			.map((e) => e.country)
	);

	return {
		period: periodOf(year, month),
		irmc: {
			value: round2(current.irmc),
			valueFormatted: formatES(current.irmc),
			raw: round2(current.irmcBruto),
			level: current.classification.level,
			levelLabel: current.classification.label,
			color: current.classification.color
		},
		totals,
		previous: prev
			? {
					period: periodOf(prev.year, prev.month),
					irmc: {
						value: round2(prev.irmc),
						valueFormatted: formatES(prev.irmc),
						level: prev.classification.level,
						levelLabel: prev.classification.label
					},
					totals: previousTotals!
			  }
			: null,
		trend,
		byType,
		demographics,
		geography: {
			countries,
			topByEvents,
			topByPeople,
			divergentTops: !!(topByEvents && topByPeople && topByEvents.name !== topByPeople.name),
			locations,
			deathCountries,
			missingCountries
		},
		classification: {
			ranges: [
				{ level: 'bajo', label: 'Bajo', min: 0.0, max: 0.25 },
				{ level: 'moderado', label: 'Moderado', min: 0.26, max: 0.5 },
				{ level: 'alto', label: 'Alto', min: 0.51, max: 0.75 },
				{ level: 'extremo', label: 'Extremo', min: 0.76, max: 1.0 }
			]
		},
		excluded: {
			count: excluded.length,
			events: excluded.map((e) => ({
				id: e.id,
				date: e.date ? e.date.toISOString().slice(0, 10) : null,
				type: e.eventType,
				country: e.country,
				location: e.location,
				name: e.name,
				description: e.description
			}))
		},
		meta: {
			source: meta.source,
			generatedAt: new Date().toISOString(),
			spreadsheetId: meta.spreadsheetId
		}
	};
}
