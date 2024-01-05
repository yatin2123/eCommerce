// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfMxnYFafe6r-LuNybpnV6cseYJ8iBAVM",
  authDomain: "project-f4c06.firebaseapp.com",
  projectId: "project-f4c06",
  storageBucket: "project-f4c06.appspot.com",
  messagingSenderId: "180552207503",
  appId: "1:180552207503:web:1b5e5444e5fd0690f9f4fa",
  measurementId: "G-3W9HWN61CS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


