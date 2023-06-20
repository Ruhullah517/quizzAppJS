import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyDc5HN475D4NVS6UisdkCxa7tzn5gBLbhI",
    authDomain: "quizz-app-69ad9.firebaseapp.com",
    projectId: "quizz-app-69ad9",
    storageBucket: "quizz-app-69ad9.appspot.com",
    messagingSenderId: "915358931941",
    appId: "1:915358931941:web:4af0e6427980d13e44ed0c",
    measurementId: "G-XQYYX88Y6F"
};



function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);


            // Initialize Firebase Cloud Messaging and get a reference to the service
            const messaging = getMessaging(app);
            getToken(messaging, { vapidKey: "BA89HiGbJ_O0mwGxgB5ZXRM-DncHY9k4S4cNMJmGCgVeKk2HeeoTfvjR3CYLd1SrHurB35QpehCDDND4MghsOPM" }).then((token) => {
                if (token) {
                    console.log("TOken", token);
                } else {
                    console.log("cant get token");
                }
            });

        } else {
            console.log("dont have permission");
        }
    })
};

requestPermission();