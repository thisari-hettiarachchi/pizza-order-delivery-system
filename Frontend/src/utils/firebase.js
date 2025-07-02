// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiSyMguZC4sv9_HQXFxjafOzSZtE85hYY",
  authDomain: "pizza-order-delivery-system.firebaseapp.com",
  projectId: "pizza-order-delivery-system",
  storageBucket: "pizza-order-delivery-system.firebasestorage.app",
  messagingSenderId: "298467392694",
  appId: "1:298467392694:web:19ef386fef43e2830eba17",
  measurementId: "G-87MT81S0NR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };