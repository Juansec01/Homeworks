import { useState, useCallback, useRef } from "react";
import { db } from "./firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { useSelector } from "react-redux";

export default function useCollection(collectionName) {
  const [results, setResults] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  
  const user = useSelector((state) => state.auth.user);
  const lastFetchRef = useRef(0); 

  const getAll = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastFetchRef.current < 2000) {
      console.log("🛑 Llamada a getAll evitada (demasiado rápido)");
      return;
    }
    lastFetchRef.current = now;

    if (!user) {
      setResults([]);
      return;
    }

    console.log("🔄 getAll ejecutándose...");
    setIsPending(true);
    setError(null);
    
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResults(items);
      console.log("✅ getAll completado:", items.length, "items");
    } catch (err) {
      console.error("❌ Error en getAll:", err.message);
      setError(`Error al cargar: ${err.message}`);
    } finally {
      setIsPending(false);
    }
  }, [collectionName, user]); 

  const add = async (data) => {
    if (!user) {
      setError("Usuario no autenticado");
      throw new Error("Usuario no autenticado");
    }

    setIsPending(true);
    setError(null);
    try {
      console.log("➕ Guardando nuevo documento...");
      const dataWithUser = {
        ...data,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, collectionName), dataWithUser);
      console.log("✅ Documento guardado:", docRef.id);
      
      const newItem = {
        id: docRef.id,
        ...dataWithUser,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setResults(prev => [...prev, newItem]);
      
      return docRef;
    } catch (err) {
      console.error("❌ Error en add:", err.message);
      setError(`Error al guardar: ${err.message}`);
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  const update = async (id, data) => {
    setIsPending(true);
    setError(null);
    try {
      console.log("🔧 Actualizando documento:", id);
      const dataWithTimestamp = {
        ...data,
        updatedAt: serverTimestamp()
      };
      
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, dataWithTimestamp);
      console.log("✅ Documento actualizado:", id);
      
      setResults(prev => prev.map(item => 
        item.id === id 
          ? { ...item, ...data, updatedAt: new Date() }
          : item
      ));
      
    } catch (err) {
      console.error("❌ Error en update:", err.message);
      setError(`Error al actualizar: ${err.message}`);
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  const remove = async (id) => {
    setIsPending(true);
    setError(null);
    try {
      console.log("🗑️ Eliminando documento:", id);
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      console.log("✅ Documento eliminado:", id);
      
      setResults(prev => prev.filter(item => item.id !== id));
      
    } catch (err) {
      console.error("❌ Error en remove:", err.message);
      setError(`Error al eliminar: ${err.message}`);
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  const refresh = () => {
    getAll(true);
  };

  return { 
    add, 
    getAll: refresh, 
    update, 
    remove, 
    isPending, 
    results, 
    error 
  };
}