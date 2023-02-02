import { getSheet } from '$lib/data/api';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const { data: missing } = await getSheet('Personas desaparecidas');
    return {
        missing
    };
}) satisfies PageServerLoad;