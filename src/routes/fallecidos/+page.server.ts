import { batchGetSheet } from '$lib/data/api';

export const prerender = false;

export async function load({
	setHeaders
}) {
	const {
		data: { valueRanges: sheet }
	} = await batchGetSheet([
		'Personas fallecidas',
		'Todos los eventos!O:P'
	]);

	const mapTotals = (data: any[][] | null | undefined) =>
		data?.slice(1).reduce(
			(acc: any, c) => {
				acc['deceased'] += +(c?.[0] ?? 0);
				acc['missing'] += +(c?.[1] ?? 0);
				return acc;
			},
			{ deceased: 0, missing: 0 }
		);

	setHeaders({
		'Cache-Control': 'max-age=300, s-max-age=300, stale-while-revalidate=300'
	});

	return {
		deceased: sheet?.[0]?.values?.slice(1).map((e) => ({ 
			name: e[3], 
			age: e[4], 
			death_date: e[6],
			death_cause: e[7],
			death_location: e[8],
			place_of_origin: e[12],
			details: e[11] 
		}))?.sort((a,b) => a.name.localeCompare(b.name)),
		totals: mapTotals(sheet?.[1].values)
	};
}