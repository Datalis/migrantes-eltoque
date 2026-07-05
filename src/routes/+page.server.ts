import { batchGetSheet } from '$lib/data/api';
import type { PageServerLoad } from './$types';

export const prerender = false;

const ARTICLES_URL =
	'https://api.eltoque.com/posts?categories=63daba063c88b2001e980d89&_sort=publish_date:DESC';

/**
 * Trae los artículos del blog de elTOQUE (contenido secundario del home). La
 * API externa puede fallar o quedar detrás de un challenge de Cloudflare, en
 * cuyo caso responde HTML (403) en vez de JSON. Ante cualquier fallo devolvemos
 * `[]` para NO tumbar toda la página: el memorial es el contenido principal y
 * no debe depender de la disponibilidad del blog.
 */
const fetchArticles = async (fetch: typeof globalThis.fetch): Promise<unknown[]> => {
	try {
		const res = await fetch(ARTICLES_URL, { headers: { Accept: 'application/json' } });
		if (!res.ok) {
			console.warn(`[home] posts API respondió ${res.status}; se omiten los artículos.`);
			return [];
		}
		if (!(res.headers.get('content-type') ?? '').includes('application/json')) {
			console.warn('[home] posts API no devolvió JSON (¿challenge de Cloudflare?); se omiten.');
			return [];
		}
		const data = await res.json();
		return Array.isArray(data) ? data : [];
	} catch (err) {
		console.warn('[home] no se pudieron cargar los artículos del blog:', err);
		return [];
	}
};

export const load: PageServerLoad = async ({ url, fetch }) => {
	const modal = url.searchParams.get('form');

	const {
		data: { valueRanges: sheet }
	} = await batchGetSheet([
		'Personas fallecidas',
		'Personas desaparecidas',
		'Lugares peligrosos',
		'Todos los eventos!O:P',
		'Todos los eventos'
	]);
	const articles = await fetchArticles(fetch);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const mapTotals = (data: any[][] | null | undefined) =>
		data?.slice(1).reduce(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(acc: any, c) => {
				acc['deceased'] += +(c?.[0] ?? 0);
				acc['missing'] += +(c?.[1] ?? 0);
				return acc;
			},
			{ deceased: 0, missing: 0 }
		);

	return {
		deceased: sheet?.[0].values?.slice(1),
		missing: sheet?.[1]?.values?.slice(1)?.reverse(),
		places: sheet?.[2]?.values?.slice(1),
		totals: mapTotals(sheet?.[3].values),
		events: sheet?.[4]?.values?.slice(1),
		articles,
		modal
	};
};

// export const actions: Actions = {
// 	contact: async ({ request }) => {
// 		const data = await request.formData();

// 		const isMissing = data.get('is_missing');
// 		const personName = data.get('person_name');
// 		const contactName = data.get('contact_name');
// 		const email = data.get('email');
// 		const phone = data.get('phone');
// 		const message = data.get('message');

// 		await sendMail({ personName, contactName, email, phone, message, isMissing });
// 	}
// };
