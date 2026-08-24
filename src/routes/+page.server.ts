import { batchGetSheet, get } from '$lib/data/api';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ url }) => {
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
	// El carrusel de artículos es contenido secundario y section-7 ya trae dos fijos:
	// si la API del blog falla, la página sigue renderizando sin ellos.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let articles: any[] = [];
	try {
		const res = await get(
			'https://api.eltoque.com/posts?categories=63daba063c88b2001e980d89&_sort=publish_date:DESC'
		);
		if (Array.isArray(res.data)) articles = res.data;
	} catch (e) {
		console.warn('No se pudieron cargar los artículos del blog:', (e as Error).message);
	}

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
