import { batchGetSheet } from '$lib/data/api';
import type { PageServerLoad } from './$types';

// SSR en cada request en lugar de prerender. Antes era `true`, pero la llamada
// a Google Sheets en build se rompió en Netlify (Node 22 + node-fetch 2.x
// dentro de google-auth-library → ERR_STREAM_PREMATURE_CLOSE en gzip).
// Sirviendo on-demand evitamos esa dependencia en build y los datos quedan
// más frescos (no esperan al próximo deploy para actualizarse).
export const prerender = false;

export const load = (async () => {
	// const { data } = await getSheet('Personas fallecidas');
	const {
		data: { valueRanges: sheet }
	} = await batchGetSheet([
		'Personas fallecidas',
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
}) satisfies PageServerLoad;