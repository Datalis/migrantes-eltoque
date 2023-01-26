import { getDeceasedPersons, getMissingPersons } from "$lib/data/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const { data: deceased } = await getDeceasedPersons();
    const { data: missing } = await getMissingPersons();
    return {
        deceased,
        missing,
    }
}