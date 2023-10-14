import { getSheet } from "$lib/data/api";

export async function load() {

    const { data } = await getSheet('Fuentes!B1:B2');

    return {
        published_at: data.values?.[0]?.[0],
        updated_at: data.values?.[1]?.[0],
    };
}