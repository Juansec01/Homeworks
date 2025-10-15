// src/firebase/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración del proyecto "parcial2-3c676"
const firebaseConfig = {
  apiKey: "AIzaSyB2a1lSpVFBIwfDsb7UY3VWfx8tBP1aUKk",
  authDomain: "parcial2-3c676.firebaseapp.com",
  projectId: "parcial2-3c676",
  storageBucket: "parcial2-3c676.appspot.com",
  messagingSenderId: "274556577331",
  appId: "1:274556577331:web:4c2679d35c0d937582e546",
  measurementId: "G-0MHD00L2H4",
};

// Inicialización segura de Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Servicios principales
export const db = getFirestore(app);
export const auth = getAuth(app);

// Constantes para nombres de colección/documento
export const FIRESTORE_COLLECTION = "Parcial2_posts";
export const FIRESTORE_DOC_ID = "defaultDoc";

// Referencias básicas (por si las usas en otros componentes)
export const getCollectionRef = (collectionName = FIRESTORE_COLLECTION) =>
  collection(db, collectionName);

export const getDocRef = (
  collectionName = FIRESTORE_COLLECTION,
  docId = FIRESTORE_DOC_ID
) => doc(db, collectionName, docId);

// =============================================================
// FUNCIONES DE PERSISTENCIA GLOBAL
// =============================================================

// Guarda el estado global del usuario en Firestore
export async function saveStateToFirestore(userId, state) {
  if (!userId) return;
  try {
    const ref = doc(db, "Parcial2_state", userId);
    await setDoc(ref, { state, updatedAt: serverTimestamp() });
    console.log("Estado guardado correctamente en Firestore.");
  } catch (err) {
    console.error("Error guardando estado en Firestore:", err);
  }
}

// Recupera el estado global del usuario desde Firestore
export async function loadStateFromFirestore(userId) {
  if (!userId) return null;
  try {
    const ref = doc(db, "Parcial2_state", userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      console.warn("No hay estado guardado en Firestore para este usuario.");
      return null;
    }
    console.log("Estado cargado correctamente desde Firestore.");
    return snap.data().state || null;
  } catch (err) {
    console.error("Error cargando estado desde Firestore:", err);
    return null;
  }
}
