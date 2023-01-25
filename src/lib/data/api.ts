import { GOOGLEAPIS_PRIVATE_KEY, GOOGLEAPIS_CLIENT_ID, GOOGLEAPIS_CLIENT_EMAIL } from "$env/static/private";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";

const SPREADSHEET_ID = "1rb96kgAuMVclENWvoZTXtXfN1pqWYdT8EifWkprBMMQ";

const auth = new GoogleAuth({
    credentials: {
        private_key: GOOGLEAPIS_PRIVATE_KEY,
        client_id: GOOGLEAPIS_CLIENT_ID,
        client_email: GOOGLEAPIS_CLIENT_EMAIL,
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets"
})

const client = await auth.getClient();

const sheet = google.sheets({ version: 'v4', auth: client });

export const getDeceasedPersons = () => sheet.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: 'Personas fallecidas' });

export const getMissingPersons = () => sheet.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: 'Personas desaparecidas' });
