import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCydN-8GuNRHyJWQkNBdgGKoJMGZ5tNC28",
  authDomain: "edya2-a841f.firebaseapp.com",
  databaseURL: "https://edya2-a841f-default-rtdb.firebaseio.com", // ✅ CRÍTICO: Añadir databaseURL
  projectId: "edya2-a841f",
  storageBucket: "edya2-a841f.firebasestorage.app",
  messagingSenderId: "121646270135",
  appId: "1:121646270135:web:b12d09ed5b37a2f7f7af32",
  measurementId: "G-X5KBSKERZE"
};

let app;
let auth;
let db;
let realtimeDb;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  realtimeDb = getDatabase(app);
  
  console.log("✅ Firebase configurado correctamente");
  console.log("📊 Project ID:", firebaseConfig.projectId);
  console.log("🔗 Database URL:", firebaseConfig.databaseURL);
} catch (error) {
  console.error("❌ Error configurando Firebase:", error);
  throw error;
}

export { auth, db, realtimeDb };
export default app;