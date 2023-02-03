import { getSheet } from '$lib/data/api';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const { data: deceased } = await getSheet('Personas fallecidas')
    return {
        deceased
    };
}) satisfies PageServerLoad;