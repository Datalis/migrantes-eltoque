import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import {
    CAPTCHA_KEY,
} from '$env/static/private';

self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.NODE_ENV == "development";
const firebaseConfig = {
    apiKey: "AIzaSyCIQUWhbCz-Gsir-kAvp9ManvI83PItFAM",
    authDomain: "apollo-exercise-2023.firebaseapp.com",
    projectId: "apollo-exercise-2023",
    storageBucket: "apollo-exercise-2023.appspot.com",
    messagingSenderId: "874427320168",
    appId: "1:874427320168:web:3d907c8b77625ec472f8dd"
};

const app = initializeApp(firebaseConfig);

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(CAPTCHA_KEY),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  return await resolve(event);
}