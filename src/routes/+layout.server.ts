import type { PageServerLoad } from "./$types";
import { getSheet } from "$lib/data/api";

export const load: PageServerLoad = async () => {

    const {data} = await getSheet('Fuentes!B1:B2');

    console.log(data.values);

    return {
        published_at: data.values?.[0]?.[0],
        updated_at: data.values?.[1]?.[0],
    }
}