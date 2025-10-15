// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCydN-8GuNRHyJWQkNBdgGKoJMGZ5tNC28",
  authDomain: "edya2-a841f.firebaseapp.com",
  projectId: "edya2-a841f",
  storageBucket: "edya2-a841f.firebasestorage.app",
  messagingSenderId: "121646270135",
  appId: "1:121646270135:web:b12d09ed5b37a2f7f7af32",
  measurementId: "G-X5KBSKERZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export auth & Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

