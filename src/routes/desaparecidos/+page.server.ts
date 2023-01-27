import { getMissingPersons } from '$lib/data/api';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const { data: missing } = await getMissingPersons();
    return {
        missing
    };
}) satisfies PageServerLoad;