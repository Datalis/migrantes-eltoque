import { getSheet } from '$lib/data/api';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const { data } = await getSheet('Personas desaparecidas');
	return {
		missing: data.values
			?.slice(1)
			.reverse()
			.map((e) => ({
				name: e[3],
				age: e[5],
				date: e[6],
				starting: e[9],
				details: e[10],
				collapsed: true
			}))
	};
}) satisfies PageServerLoad;
