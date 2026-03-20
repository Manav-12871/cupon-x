import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// ===================================================================
// IMPORTANT: Paste your own Firebase config object here from the Firebase console
// ===================================================================
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQUdVteB3YlThD9EDocIVG2LpQMXj_Vu0",
  authDomain: "coupon-x.firebaseapp.com",
  projectId: "coupon-x",
  storageBucket: "coupon-x.firebasestorage.app",
  messagingSenderId: "427728904248",
  appId: "1:427728904248:web:f6835bed76e371004646cd",
  measurementId: "G-W41423RNEP"
};

// This line initializes your Firebase app and prevents it from being initialized more than once
const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// This line gets the Firestore database instance from your initialized app
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// This line makes the database instance available to other files in your project
export { db, auth };

