import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDgHwZ8ecsFdnHVQ4akpJk9lZHq1t7WR_0",
    authDomain: "rick-morty-universe-5598d.firebaseapp.com",
    databaseURL: "https://rick-morty-universe-5598d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rick-morty-universe-5598d",
    storageBucket: "rick-morty-universe-5598d.appspot.com",
    messagingSenderId: "809858109284",
    appId: "1:809858109284:web:bc09c85a15db970fd93471"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;
