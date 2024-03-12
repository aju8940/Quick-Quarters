// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "quick-quarters-cab4d.firebaseapp.com",
  projectId: "quick-quarters-cab4d",
  storageBucket: "quick-quarters-cab4d.appspot.com",
  messagingSenderId: "1009868811315",
  appId: "1:1009868811315:web:d6073d89075e092ad64746"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
