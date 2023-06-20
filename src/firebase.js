import firebase from 'firebase/app';
// import { initializeApp } from "firebase/app";
// import { getMessaging } from 'firebase/messaging'


const config = {
    apiKey: "AIzaSyDc5HN475D4NVS6UisdkCxa7tzn5gBLbhI",
    authDomain: "quizz-app-69ad9.firebaseapp.com",
    projectId: "quizz-app-69ad9",
    storageBucket: "quizz-app-69ad9.appspot.com",
    messagingSenderId: "915358931941",
    appId: "1:915358931941:web:4af0e6427980d13e44ed0c"
}


// export const app = initializeApp(config);
// export const messaging = getMessaging(app)
firebase.initializeApp(config);
export default firebase;

