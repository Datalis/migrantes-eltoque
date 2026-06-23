import { batchGetSheet } from '$lib/data/api';
import { parseDate } from '$lib/utils';
import type { PageServerLoad } from './$types';

// SSR on-demand (no prerender): como en /fallecidos y /desaparecidos, evitamos
// la llamada a Google Sheets en build (flaky en Netlify) y servimos datos frescos.
// Además esta página lee el query param `?q=` para precargar la búsqueda del widget.
export const prerender = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Person = Record<string, any> & { type: 'deceased' | 'missing' };

// Fecha relevante para el orden cronológico:
//  - Fallecido  → fecha de muerte
//  - Desaparecido → fecha en que fue visto por última vez
const relevantDate = (p: Person) => (p.type === 'deceased' ? p.death_date : p.missing_date);

export const load = (async () => {
	const {
		data: { valueRanges: sheet }
	} = await batchGetSheet([
		'Personas fallecidas',
		'Personas desaparecidas',
		'Todos los eventos!O:P'
	]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const mapTotals = (data: any[][] | null | undefined) =>
		data?.slice(1).reduce(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(acc: any, c) => {
				acc['deceased'] += +(c?.[0] ?? 0);
				acc['missing'] += +(c?.[1] ?? 0);
				return acc;
			},
			{ deceased: 0, missing: 0 }
		);

	const deceased: Person[] =
		sheet?.[0]?.values?.slice(1).map((e) => ({
			type: 'deceased' as const,
			name: e[3],
			age: e[4],
			death_date: e[6],
			death_cause: e[7],
			death_location: e[8],
			death_country: e[9]
		})) ?? [];

	const missing: Person[] =
		sheet?.[1]?.values?.slice(1).map((e) => ({
			type: 'missing' as const,
			name: e[3],
			age: e[5],
			birthdate: e[4],
			birthplace: e[11],
			missing_date: e[6],
			missing_place: e[7],
			missing_country: e[8]
		})) ?? [];

	const people = [...deceased, ...missing].sort((a, b) => {
		const da = parseDate(relevantDate(a));
		const db = parseDate(relevantDate(b));
		const ta = da ? da.getTime() : -Infinity;
		const tb = db ? db.getTime() : -Infinity;
		// 1) Cronológico: más reciente primero (fechas no parseables al final).
		if (ta !== tb) return tb - ta;
		// 2) Misma fecha → primero los fallecidos, luego los desaparecidos.
		if (a.type !== b.type) return a.type === 'deceased' ? -1 : 1;
		// 3) Misma fecha y mismo tipo → alfabético por nombre.
		return (a.name ?? '').localeCompare(b.name ?? '');
	});

	return {
		people,
		totals: mapTotals(sheet?.[2]?.values)
	};
}) satisfies PageServerLoad;
