import { GOOGLEAPIS_PRIVATE_KEY, GOOGLEAPIS_CLIENT_ID, GOOGLEAPIS_CLIENT_EMAIL } from "$env/static/private";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";

const SPREADSHEET_ID = "1rb96kgAuMVclENWvoZTXtXfN1pqWYdT8EifWkprBMMQ";

const auth = new GoogleAuth({
    credentials: {
        private_key: GOOGLEAPIS_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
        client_id: GOOGLEAPIS_CLIENT_ID,
        client_email: GOOGLEAPIS_CLIENT_EMAIL,
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets"
})


const get = async (range: string) => {
    // const client = await auth.getClient();
    const sheet = google.sheets({ version: 'v4', auth: auth });
    return sheet.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range });
}


export const getDeceasedPersons = () => get('Personas fallecidas');
export const getMissingPersons = () => get('Personas desaparecidas');
export const getDangerousPlaces = () => get('Lugares peligrosos');

export const getElToqueArticles = async () => {
    const URL = 'https://api.eltoque.com/posts?categories=63daba063c88b2001e980d89&_sort=publish_date:DESC&_limit=2';
    const data = await fetch(URL);
    return { data: await data.json() };
}
