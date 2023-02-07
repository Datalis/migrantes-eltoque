import { getSheet } from '$lib/data/api';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const { data } = await getSheet('Personas fallecidas');
	return {
		deceased: data?.values?.slice(1).map((e) => ({ name: e[2], age: e[3], details: e[10] }))
	};
}) satisfies PageServerLoad;