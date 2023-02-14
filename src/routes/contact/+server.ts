import { sendMail } from '$lib/data/api';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();

	const isMissing = data.get('is_missing');
	const personName = data.get('person_name');
	const contactName = data.get('contact_name');
	const email = data.get('email');
	const phone = data.get('phone');
	const message = data.get('message');

	await sendMail({ personName, contactName, email, phone, message, isMissing });
    
	return new Response();
};
