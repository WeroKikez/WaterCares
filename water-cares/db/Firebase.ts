import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCTmRH6aLIM9vpYyFk82sH8sF6foG8rHdg",
    authDomain: "watercarestesting.firebaseapp.com",
    databaseURL: "https://watercarestesting-default-rtdb.firebaseio.com",
    projectId: "watercarestesting",
    storageBucket: "watercarestesting.appspot.com",
    messagingSenderId: "693507865032",
    appId: "1:693507865032:web:8487c933b448533c08e8fd"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);