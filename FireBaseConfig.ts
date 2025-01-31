// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJvLgCCyG0ZJnAQ5rQa5jax9M3iLxIS-c",
  authDomain: "mon-resto-77bf4.firebaseapp.com",
  projectId: "mon-resto-77bf4",
  storageBucket: "mon-resto-77bf4.firebasestorage.app",
  messagingSenderId: "466123516881",
  appId: "1:466123516881:web:b3b05d70edc57ff8800ef0"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);