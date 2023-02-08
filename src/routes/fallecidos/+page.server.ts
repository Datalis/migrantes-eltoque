import { batchGetSheet } from '$lib/data/api';
import type { PageServerLoad } from './$types';

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
		deceased: sheet?.[0]?.values?.slice(1).map((e) => ({ name: e[3], age: e[4], details: e[11] }))?.sort((a,b) => a.name.localeCompare(b.name)),
		totals: mapTotals(sheet?.[1].values)
	};
}) satisfies PageServerLoad;