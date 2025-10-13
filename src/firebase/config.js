import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCydN-8GuNRHyJWQkNBdgGKoJMGZ5tNC28",
  authDomain: "edya2-a841f.firebaseapp.com",
  projectId: "edya2-a841f",
  storageBucket: "edya2-a841f.firebasestorage.app",
  messagingSenderId: "121646270135",
  appId: "1:121646270135:web:b12d09ed5b37a2f7f7af32",
  measurementId: "G-X5KBSKERZE"
};

// ✅ Previene error de app duplicada
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 🔐 Servicios que usa tu app
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
