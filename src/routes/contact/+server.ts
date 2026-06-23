import { sendMail } from '$lib/data/api';
import type { RequestHandler } from './$types';

const SECRET_KEY = process.env.SECRET_KEY || '1x0000000000000000000000000000000AA';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();

	const isMissing = data.get('is_missing');
	const personName = data.get('person_name');
	const contactName = data.get('contact_name');
	const email = data.get('email');
	const phone = data.get('phone');
	const message = data.get('message');
	const token = data.get('cf-turnstile-response');
	const ip = request.headers.get('CF-Connecting-IP');

	const formData = new FormData();
	formData.append('secret', SECRET_KEY);
	formData.append('response', token || '');
	formData.append('remoteip', ip || '');

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST'
	});

	const outcome = await result.json();

	// Verificación de Turnstile fallida: respondemos con error para que el
	// formulario muestre el toast de error en vez de un falso "enviado".
	if (!outcome.success) {
		console.warn('Turnstile verification failed', outcome['error-codes']);
		return new Response('Captcha verification failed', { status: 403 });
	}

	try {
		await sendMail({ personName, contactName, email, phone, message, isMissing });
	} catch (err) {
		console.error('Error enviando la denuncia con Resend', err);
		return new Response('Email delivery failed', { status: 502 });
	}

	return new Response(null, { status: 204 });
};
