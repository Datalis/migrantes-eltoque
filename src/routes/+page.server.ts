import { batchGetSheet, get } from '$lib/data/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

    const { data: { valueRanges: sheet }} = await batchGetSheet(['Personas fallecidas', 'Personas desaparecidas', 'Lugares peligrosos', 'Todos los eventos!O:P']);
    const { data: articles } = await get('https://api.eltoque.com/posts?categories=63daba063c88b2001e980d89&_sort=publish_date:DESC&_limit=6');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapTotals = (data: any[][] | null | undefined) => data?.slice(1).reduce((acc: any, c) => {
        acc['deceased'] += +(c?.[0] ?? 0);
        acc['missing'] += +(c?.[1] ?? 0);
        return acc;
    }, { deceased: 0, missing: 0 })

	return {
		deceased: sheet?.[0].values?.slice(1),
		missing: sheet?.[1]?.values?.slice(1)?.reverse(),
		places: sheet?.[2]?.values?.slice(1),
        totals: mapTotals(sheet?.[3].values),
		articles,
	};
};
