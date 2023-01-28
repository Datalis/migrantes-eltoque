import { getDeceasedPersons } from '$lib/data/api';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const { data: deceased } = await getDeceasedPersons();
    return {
        deceased
    };
}) satisfies PageServerLoad;