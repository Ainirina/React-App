// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKckCKLzbrHvByozmDz3YOQNcnchOSHbI",
  authDomain: "cooking-d5396.firebaseapp.com",
  projectId: "cooking-d5396",
  storageBucket: "cooking-d5396.firebasestorage.app",
  messagingSenderId: "444201544812",
  appId: "1:444201544812:web:f6892c9579114a4ac2fc49"
};
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);