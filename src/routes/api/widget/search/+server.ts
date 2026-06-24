import { json } from '@sveltejs/kit';
import { batchGetSheet } from '$lib/data/api';
import { trimString } from '$lib/utils';
import type { RequestHandler } from './$types';

// Endpoint público (con CORS) para el buscador del widget "La Travesía".
// Dado ?q=NOMBRE responde si la persona aparece en nuestros registros y en qué
// lista(s), para que el widget muestre "sí aparece" y enlace a /personas?q=.
//
// El emparejamiento replica el de la página de resultados
// (src/routes/personas/+page.svelte): normaliza sin acentos/mayúsculas y busca
// la subcadena en cualquier campo de texto, de modo que un "encontrado" aquí
// garantiza resultados en el destino.
export const prerender = false;

const RESULTS_PAGE = 'https://latravesia.eltoque.com/personas';

const CORS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
};

const norm = (s: string) =>
	s
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '');

// Mapeo de columnas idéntico al loader de /personas. Acoplado al layout de las
// hojas `Personas fallecidas` / `Personas desaparecidas`.
const mapDeceased = (e: unknown[]) => ({
	name: e[3],
	age: e[4],
	death_date: e[6],
	death_cause: e[7],
	death_location: e[8],
	death_country: e[9]
});
const mapMissing = (e: unknown[]) => ({
	name: e[3],
	age: e[5],
	birthdate: e[4],
	birthplace: e[11],
	missing_date: e[6],
	missing_place: e[7],
	missing_country: e[8]
});

const matches = (person: Record<string, unknown>, needle: string) =>
	Object.values(person).some((v) => typeof v === 'string' && norm(v).indexOf(needle) !== -1);

export const OPTIONS: RequestHandler = () => new Response(null, { headers: CORS });

export const GET: RequestHandler = async ({ url }) => {
	const query = trimString(url.searchParams.get('q') ?? '');

	const resultsUrl = (q: string) => `${RESULTS_PAGE}?q=${encodeURIComponent(q)}`;

	if (query === '') {
		return json(
			{ query: '', found: false, count: 0, byType: { deceased: 0, missing: 0 }, url: RESULTS_PAGE },
			{ headers: CORS }
		);
	}

	const {
		data: { valueRanges: sheet }
	} = await batchGetSheet(['Personas fallecidas', 'Personas desaparecidas']);

	const deceased = (sheet?.[0]?.values?.slice(1) ?? []).map(mapDeceased);
	const missing = (sheet?.[1]?.values?.slice(1) ?? []).map(mapMissing);

	const needle = norm(query);
	const deceasedCount = deceased.filter((p) => matches(p, needle)).length;
	const missingCount = missing.filter((p) => matches(p, needle)).length;
	const count = deceasedCount + missingCount;

	return json(
		{
			query,
			found: count > 0,
			count,
			byType: { deceased: deceasedCount, missing: missingCount },
			url: resultsUrl(query)
		},
		{ headers: { ...CORS, 'Cache-Control': 'public, max-age=300' } }
	);
};
