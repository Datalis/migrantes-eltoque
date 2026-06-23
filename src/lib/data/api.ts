import {
	GOOGLEAPIS_PRIVATE_KEY,
	GOOGLEAPIS_CLIENT_ID,
	GOOGLEAPIS_CLIENT_EMAIL,
	RESEND_API_KEY
} from '$env/static/private';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import { Resend } from 'resend';

const SPREADSHEET_ID = '1rb96kgAuMVclENWvoZTXtXfN1pqWYdT8EifWkprBMMQ';

const auth = new GoogleAuth({
	credentials: {
		private_key: GOOGLEAPIS_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
		client_id: GOOGLEAPIS_CLIENT_ID,
		client_email: GOOGLEAPIS_CLIENT_EMAIL
	},
	scopes: 'https://www.googleapis.com/auth/spreadsheets'
});

// Reintentos para llamadas a Google: el OAuth/Sheets ha mostrado cierres
// prematuros de stream durante el build de Netlify (red flaky), y un único
// fallo abortaba todo el prerender. Reintentamos con backoff exponencial.
const TRANSIENT_CODES = new Set([
	'ERR_STREAM_PREMATURE_CLOSE',
	'ECONNRESET',
	'ETIMEDOUT',
	'EAI_AGAIN',
	'ENOTFOUND',
	'ECONNREFUSED',
	'EPIPE'
]);
const RETRY_DELAYS_MS = [1000, 3000, 6000];

const isTransient = (err: unknown) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const e = err as any;
	const code = e?.code || e?.errno;
	if (code && TRANSIENT_CODES.has(code)) return true;
	const status = e?.statusCode ?? e?.response?.status ?? e?.code;
	return (
		status === 408 ||
		status === 429 ||
		(typeof status === 'number' && status >= 500 && status < 600)
	);
};

const withRetry = async <T>(label: string, fn: () => Promise<T>): Promise<T> => {
	let lastErr: unknown;
	for (let i = 0; i <= RETRY_DELAYS_MS.length; i++) {
		try {
			return await fn();
		} catch (err) {
			lastErr = err;
			if (i === RETRY_DELAYS_MS.length || !isTransient(err)) throw err;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const code = (err as any)?.code || (err as any)?.errno || 'unknown';
			console.warn(
				`[api:${label}] error transitorio (${code}), reintentando en ${RETRY_DELAYS_MS[i]}ms…`
			);
			await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[i]));
		}
	}
	throw lastErr;
};

export const getSheet = async (range: string) =>
	withRetry(`getSheet ${range}`, () => {
		const sheet = google.sheets({ version: 'v4', auth: auth });
		return sheet.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range });
	});

export const batchGetSheet = async (ranges: string[]) =>
	withRetry(`batchGetSheet`, () => {
		const sheet = google.sheets({ version: 'v4', auth: auth });
		return sheet.spreadsheets.values.batchGet({ spreadsheetId: SPREADSHEET_ID, ranges });
	});

export const get = async (url: string) => {
	const data = await fetch(url);
	return { data: await data.json() };
};

const resend = new Resend(RESEND_API_KEY);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendMail = async (opts: any) => {
	const { personName, contactName, email, phone, message, isMissing } = opts;
	const isMissingPerson = isMissing === true || isMissing === 'true';

	const data = await withRetry('sendMail', async () => {
		const { data, error } = await resend.emails.send({
			from: 'Denuncias La Travesía <denuncias@masvocesfoundation.org>',
			to: ['audiencias@eltoque.com'],
			// Permite responder directamente al denunciante (si dejó email).
			replyTo: email ? [email] : undefined,
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
                <span style="font-weight: bold;">Nombre del ${
									isMissingPerson ? 'desaparecido' : 'fallecido'
								}: </span>
                <span>${personName}</span>
            </li>
            <li>
                <span style="font-weight: bold;">Mensaje: </span>
                <span>${message}</span>
            </li>
        </ul>
        `
		});

		// Resend no lanza: devuelve { error }. Lo convertimos en throw para que
		// withRetry reintente ante 429/500 y el endpoint /contact propague el fallo.
		if (error) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const err = new Error(error.message) as any;
			err.name = error.name;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			err.statusCode = (error as any).statusCode;
			throw err;
		}
		return data;
	});

	console.debug('Email enviado: %s', data?.id);
};
