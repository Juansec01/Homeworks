import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCydN-8GuNRHyJWQkNBdgGKoJMGZ5tNC28",
  authDomain: "edya2-a841f.firebaseapp.com",
  projectId: "edya2-a841f",
  storageBucket: "edya2-a841f.firebasestorage.app",
  messagingSenderId: "121646270135",
  appId: "1:121646270135:web:b12d09ed5b37a2f7f7af32",
  measurementId: "G-X5KBSKERZE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
  console.log("Firestore persistence error:", err.code);
});

console.log("🔥 Firebase initialized successfully");
console.log("🔍 Project ID:", firebaseConfig.projectId);

export default app;