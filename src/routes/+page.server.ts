import { getDeceasedPersons, getMissingPersons, getDangerousPlaces } from "$lib/data/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        deceased: (await getDeceasedPersons()).data,
        missing: (await getMissingPersons()).data,
        places: (await getDangerousPlaces()).data,
    }
}