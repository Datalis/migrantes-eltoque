import {
	GOOGLEAPIS_PRIVATE_KEY,
	GOOGLEAPIS_CLIENT_ID,
	GOOGLEAPIS_CLIENT_EMAIL,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USERNAME,
	SMTP_PASSWORD
} from '$env/static/private';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const SPREADSHEET_ID = '1rb96kgAuMVclENWvoZTXtXfN1pqWYdT8EifWkprBMMQ';

const auth = new GoogleAuth({
	credentials: {
		private_key: GOOGLEAPIS_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
		client_id: GOOGLEAPIS_CLIENT_ID,
		client_email: GOOGLEAPIS_CLIENT_EMAIL
	},
	scopes: 'https://www.googleapis.com/auth/spreadsheets'
});

export const getSheet = async (range: string) => {
	const sheet = google.sheets({ version: 'v4', auth: auth });
	return sheet.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range });
};

export const batchGetSheet = async (ranges: string[]) => {
	const sheet = google.sheets({ version: 'v4', auth: auth });
	return sheet.spreadsheets.values.batchGet({ spreadsheetId: SPREADSHEET_ID, ranges });
};

// Cloudflare desafía las peticiones no-navegador a *.eltoque.com; esta cabecera las deja pasar.
const isElToque = (url: string) => {
	try {
		const { hostname } = new URL(url);
		return hostname === 'eltoque.com' || hostname.endsWith('.eltoque.com');
	} catch {
		return false;
	}
};

export const get = async (url: string) => {
	const res = await fetch(url, {
		headers: isElToque(url) ? { 'x-application': '1' } : {}
	});
	const contentType = res.headers.get('content-type') || '';
	if (!res.ok || !contentType.includes('application/json')) {
		throw new Error(`GET ${url} respondió ${res.status} (${contentType || 'sin content-type'})`);
	}
	return { data: await res.json() };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendMail = async (opts: any) => {
	const { personName, contactName, email, phone, message, isMissingPerson } = opts;

	const transporter = nodemailer.createTransport({
		host: SMTP_HOST,
		port: +SMTP_PORT,
		secure: false,
		auth: {
			user: SMTP_USERNAME,
			pass: SMTP_PASSWORD
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	const info = await transporter.sendMail({
		from: 'desarrollo@eltoque.com',
		to: 'audiencias@eltoque.com',
		subject: `Nueva denuncia - ${isMissingPerson ? 'Desaparecido' : 'Fallecido'}`,
		html: `
        <ul>
            <li>
                <span style="font-weight: bold;">Denunciante: </span>
                <span>${contactName}</span>
            </li>
            <li>
                <span style="font-weight: bold;">Email: </span>
                <span>${email}</span>
            </li>
            <li>
                <span style="font-weight: bold;">Teléfono: </span>
                <span>${phone}</span>
            </li>
            <li>
                <span style="font-weight: bold;">Nombre del ${isMissingPerson ? 'desaparecido' : 'fallecido'}: </span>
                <span>${personName}</span>
            </li>
            <li>
                <span style="font-weight: bold;">Mensaje: </span>
                <span>${message}</span>
            </li>
        </ul>
        `
	});

	console.debug('Message sent: %s', info.messageId);
};
