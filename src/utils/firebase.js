// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,  // Correctly accessing the API key,
  authDomain: "credit-card-rewards-tracker.firebaseapp.com",
  projectId: "credit-card-rewards-tracker",
  storageBucket: "credit-card-rewards-tracker.appspot.com",
  messagingSenderId: "251745659893",
  appId: "1:251745659893:web:6fa7399fe4a79e284c0ebc",
  measurementId: "G-J113142Q72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);