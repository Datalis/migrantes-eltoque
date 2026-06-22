import { getSheet } from '$lib/data/api';
import { computeMonthlyIrmc, parseEvents, severityOf } from '$lib/data/irmc';
import type { PageServerLoad } from './$types';

export const prerender = false;

/** Forma ligera y serializable de un evento para el filtrado en el cliente. */
export interface RiskEvent {
	year: number;
	month: number; // 1–12
	label: string; // nombre o ubicación legible
	eventType: string | null;
	country: string | null;
	coordenates: string | null;
	personsNo: number;
	womenNo: number;
	menNo: number;
	childrenNo: number;
	deaths: number;
	missingsNo: number;
}

export const load: PageServerLoad = async () => {
	const { data } = await getSheet('Todos los eventos');
	const rows = data.values?.slice(1);

	// Año inicial del análisis: a partir de 2021, cuando la cobertura de datos
	// es suficiente para que el índice sea representativo.
	const START_YEAR = 2021;
	const startCutoff = Date.UTC(START_YEAR, 0, 1, 0, 0, 0);

	// Descarta meses futuros aunque estén cargados en la hoja: solo se considera
	// hasta el último día del mes actual (según la fecha del servidor).
	const now = new Date();
	const endCutoff = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59);

	const events = parseEvents(rows).filter(
		(ev) => ev.date!.getTime() >= startCutoff && ev.date!.getTime() <= endCutoff
	);
	const series = computeMonthlyIrmc(events);

	// Eventos ligeros para el mapa, indicadores y filtros (solo los que cuentan
	// en el índice: con tipo de severidad conocida).
	const riskEvents: RiskEvent[] = events
		.filter((ev) => ev.date && severityOf(ev.eventType) !== null)
		.map((ev) => ({
			year: ev.date!.getUTCFullYear(),
			month: ev.date!.getUTCMonth() + 1,
			label: ev.name || ev.location || ev.country || 'Incidente',
			eventType: ev.eventType,
			country: ev.country,
			coordenates: ev.coordenates,
			personsNo: ev.personsNo,
			womenNo: ev.womenNo,
			menNo: ev.menNo,
			childrenNo: ev.childrenNo,
			deaths: ev.deaths,
			missingsNo: ev.missingsNo
		}));

	const years = [...new Set(series.map((m) => m.year))].sort((a, b) => b - a);
	const countries = [...new Set(riskEvents.map((e) => e.country).filter(Boolean) as string[])].sort(
		(a, b) => a.localeCompare(b)
	);

	return {
		series,
		events: riskEvents,
		years,
		countries,
		current: series.length ? series[series.length - 1].key : null
	};
};
