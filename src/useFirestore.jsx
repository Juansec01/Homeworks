import { useState, useEffect } from "react";
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

export default function useFirestore(collectionName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setData([]);
    }
  }, [user]);

  const loadData = async () => {
    if (!user) {
      setError("Usuario no autenticado");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log("🔄 Cargando datos de Firestore...");
      const querySnapshot = await getDocs(collection(db, collectionName));
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(items);
      console.log("✅ Datos cargados:", items.length, "elementos");
    } catch (err) {
      console.error("❌ Error cargando datos:", err);
      setError(`Error: ${err.message} (Código: ${err.code})`);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (itemData) => {
    if (!user) {
      setError("Usuario no autenticado");
      throw new Error("Usuario no autenticado");
    }

    setLoading(true);
    setError(null);
    try {
      console.log("➕ Añadiendo documento:", itemData);
      const dataWithMetadata = {
        ...itemData,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, collectionName), dataWithMetadata);
      console.log("✅ Documento añadido con ID:", docRef.id);
      
      await loadData();
      return docRef;
    } catch (err) {
      console.error("❌ Error añadiendo documento:", err);
      setError(`Error al guardar: ${err.message} (Código: ${err.code})`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, itemData) => {
    setLoading(true);
    setError(null);
    try {
      console.log("✏️ Actualizando documento:", id, itemData);
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...itemData,
        updatedAt: serverTimestamp()
      });
      await loadData();
    } catch (err) {
      console.error("❌ Error actualizando documento:", err);
      setError(`Error al actualizar: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);
    try {
      console.log("🗑️ Eliminando documento:", id);
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      await loadData();
    } catch (err) {
      console.error("❌ Error eliminando documento:", err);
      setError(`Error al eliminar: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    refresh: loadData
  };
}