// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { environment } from "./src/environments/environment";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: environment.firebaseConfig.apiKey,
  authDomain: environment.firebaseConfig.authDomain,
  projectId: environment.firebaseConfig.projectId,
  storageBucket: environment.firebaseConfig.storageBucket,
  messagingSenderId: environment.firebaseConfig.messagingSenderId,
  appId: environment.firebaseConfig.appId,
  measurementId: environment.firebaseConfig.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export default auth;