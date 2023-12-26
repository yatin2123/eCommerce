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
  apiKey: "AIzaSyBQov3afa6bgnqpEDJAE42QwijgTAoJKIc",
  authDomain: "ecommerce-4f9be.firebaseapp.com",
  projectId: "ecommerce-4f9be",
  storageBucket: "ecommerce-4f9be.appspot.com",
  messagingSenderId: "590522682563",
  appId: "1:590522682563:web:d49acbccabd91d15b2e676",
  measurementId: "G-47YSS16LY2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);