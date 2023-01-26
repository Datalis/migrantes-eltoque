import { getDeceasedPersons, getMissingPersons, getDangerousPlaces } from "$lib/data/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const { data: deceased } = await getDeceasedPersons();
    const { data: missing } = await getMissingPersons();
    const { data: places } = await getDangerousPlaces();
    return {
        deceased,
        missing,
        places,
    }
}