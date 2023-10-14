import { batchGetSheet, get } from '$lib/data/api';

export const prerender = false;

export async function load({
	setHeaders
}) {

	const {
		data: { valueRanges: sheet }
	} = await batchGetSheet([
		'Personas fallecidas',
		'Personas desaparecidas',
		'Lugares peligrosos',
		'Todos los eventos!O:P',
		'Todos los eventos'
	]);
	const { data: articles } = await get(
		'https://api.eltoque.com/posts?categories=63daba063c88b2001e980d89&_sort=publish_date:DESC&language=5fc66bd13bb648000db118bb'
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const mapTotals = (data: any[][] | null | undefined) => data?.slice(1).reduce(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
		deceased: sheet?.[0].values?.slice(1),
		missing: sheet?.[1]?.values?.slice(1)?.reverse(),
		places: sheet?.[2]?.values?.slice(1),
		totals: mapTotals(sheet?.[3].values),
		events: sheet?.[4]?.values?.slice(1),
		articles
	};
}
