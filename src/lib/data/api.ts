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


export const getSheet = async (range: string) => {
    const sheet = google.sheets({ version: 'v4', auth: auth });
    return sheet.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range });
}

export const batchGetSheet = async (ranges: string[]) => {
    const sheet = google.sheets({ version: 'v4', auth: auth });
    return sheet.spreadsheets.values.batchGet({ spreadsheetId: SPREADSHEET_ID, ranges });
}

export const get = async (url: string) => {
    const data = await fetch(url);
    return { data: await data.json() };
}


// export const getAllEvents = () => get('Todos los eventos');
// export const getDeceasedPersons = () => get('Personas fallecidas');
// export const getMissingPersons = () => get('Personas desaparecidas');
// export const getDangerousPlaces = () => get('Lugares peligrosos');

// export const getElToqueArticles = async () => {
//     const data = await fetch(ELTOQUE_API_URL);
//     return { data: await data.json() };
// }
