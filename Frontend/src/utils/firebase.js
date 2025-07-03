import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPpGQ1P1SZQN7PJkD8TUDOxFnJi0-7_qE",
  authDomain: "pizza-order-delivery-sys-77578.firebaseapp.com",
  projectId: "pizza-order-delivery-sys-77578",
  storageBucket: "pizza-order-delivery-sys-77578.firebasestorage.app",
  messagingSenderId: "747014600239",
  appId: "1:747014600239:web:31de77f32f0a1052f3b8da",
  measurementId: "G-61BCTZVNE2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };