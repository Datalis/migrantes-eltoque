import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = false;

// Proxy de imágenes de api.eltoque.com.
//
// Cloudflare desafía las peticiones no-navegador a *.eltoque.com y la cabecera
// `x-application: 1` las deja pasar, pero una etiqueta <img> no puede enviar
// cabeceras: la petición la hace el navegador y HTML no expone esa API. Así que
// la hacemos aquí, desde el servidor, y devolvemos los bytes al cliente.
//
// Se usa solo como respaldo (ver el on:error de article.svelte): las fotos que
// ya cargan directo siguen yendo directo, sin pasar por esta función.

const UPSTREAM = 'https://api.eltoque.com';

export const GET: RequestHandler = async ({ params, setHeaders }) => {
	const path = params.path ?? '';

	// Solo /uploads: acotado a los ficheros de medios, para que esto no sea un
	// proxy de propósito general hacia el resto de la API.
	if (!path.startsWith('uploads/') || path.includes('..')) {
		throw error(404, 'No encontrado');
	}

	const res = await fetch(`${UPSTREAM}/${path}`, {
		headers: { 'x-application': '1' }
	});

	if (!res.ok) {
		throw error(res.status === 404 ? 404 : 502, `El origen respondió ${res.status}`);
	}

	const contentType = res.headers.get('content-type') || '';
	if (!contentType.startsWith('image/')) {
		throw error(502, `El origen no devolvió una imagen (${contentType || 'sin content-type'})`);
	}

	setHeaders({
		'content-type': contentType,
		'cache-control': 'public, max-age=86400'
	});

	return new Response(res.body);
};
