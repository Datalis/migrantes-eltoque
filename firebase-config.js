import { API_KEY, APP_ID, PROJECT_ID } from '$env/static/private'
// self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.NODE_ENV == "development";

export const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "apollo-exercise-2023.firebaseapp.com",
    projectId: PROJECT_ID,
    storageBucket: "apollo-exercise-2023.appspot.com",
    messagingSenderId: "874427320168",
    appId: APP_ID
};


