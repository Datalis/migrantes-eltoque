import { batchGetSheet } from '$lib/data/api';
import type { PageServerLoad } from './$types';

// SSR en cada request en lugar de prerender. Antes era `true`, pero la llamada
// a Google Sheets en build se rompió en Netlify (Node 22 + node-fetch 2.x
// dentro de google-auth-library → ERR_STREAM_PREMATURE_CLOSE en gzip).
// Sirviendo on-demand evitamos esa dependencia en build y los datos quedan
// más frescos (no esperan al próximo deploy para actualizarse).
export const prerender = false;

export const load = (async () => {
	const {
		data: { valueRanges: sheet }
	} = await batchGetSheet(['Personas desaparecidas', 'Todos los eventos!O:P']);

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
		missing: sheet?.[0].values
			?.slice(1)
			.reverse()
			.map((e) => ({
				name: e[3],
				birthdate: e[4],
				age: e[5],
				birthplace: e[11],
				missing_date: e[6],
				missing_place: e[7],
				starting_point: e[9],
				details: e[10],
				collapsed: true
			})),
		totals: mapTotals(sheet?.[1].values)
	};
}) satisfies PageServerLoad;
