import React, { useState, useEffect, useCallback } from "react";
import useCollection from "./useCollection";
import { useSelector } from "react-redux";

export default function Crud() {
  const [formData, setFormData] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);
  const [localError, setLocalError] = useState("");
  
  const currentUser = useSelector((state) => state.auth.user);
  const { add, getAll, update, remove, isPending, results, error } = useCollection("users");

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      if (currentUser && mounted) {
        console.log("👤 Usuario detectado, cargando datos...");
        await getAll(); 
      } else if (mounted) {
        console.log("👤 No hay usuario, limpiando datos");
        setFormData({ name: "" });
        setEditingId(null);
      }
    };

    loadData();

    return () => {
      mounted = false; 
    };
  }, [currentUser]); 

  const handleSave = useCallback(async () => {
    if (!formData.name.trim()) {
      setLocalError("Por favor escribe un nombre antes de guardar.");
      return;
    }

    if (!currentUser) {
      setLocalError("Debes iniciar sesión para guardar usuarios.");
      return;
    }

    try {
      console.log("💾 Iniciando guardado...");
      if (editingId) {
        await update(editingId, formData);
        setEditingId(null);
        console.log("✅ Actualización completada");
      } else {
        await add(formData);
        console.log("✅ Creación completada");
      }
      setFormData({ name: "" });
      setLocalError("");
    } catch (error) {
      console.error("❌ Error en handleSave:", error);
      setLocalError(`Error: ${error.message}`);
    }
  }, [formData, editingId, currentUser, add, update]);

  const handleEdit = useCallback((item) => {
    setFormData({ name: item.name });
    setEditingId(item.id);
    setLocalError("");
  }, []);

  const handleDelete = useCallback(async (id) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmDelete) return;

    try {
      await remove(id);
      setLocalError("");
    } catch (error) {
      console.error("Error al eliminar:", error);
      setLocalError(`Error al eliminar: ${error.message}`);
    }
  }, [remove]);

  const handleCancel = useCallback(() => {
    setEditingId(null);
    setFormData({ name: "" });
    setLocalError("");
  }, []);

  const handleInputChange = useCallback((e) => {
    setFormData({ name: e.target.value });
    setLocalError("");
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Gestión de Usuarios (Firestore)</h2>
      
      {/* Información del usuario */}
      {currentUser && (
        <div style={{ 
          backgroundColor: "#2b2c2bff", 
          padding: "10px", 
          borderRadius: "5px",
          marginBottom: "15px" 
        }}>
          <strong>Usuario actual:</strong> {currentUser.email}
        </div>
      )}

      {/* Errores */}
      {(error || localError) && (
        <div style={{ 
          color: "red", 
          backgroundColor: "#3d3a3aff", 
          padding: "10px", 
          borderRadius: "5px",
          marginBottom: "15px"
        }}>
          <strong>Error:</strong> {error || localError}
        </div>
      )}

      {/* Formulario */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Escribe un nombre..."
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #535050ff",
            marginRight: "10px",
            width: "200px"
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
        />
        <button
          onClick={handleSave}
          disabled={isPending || !currentUser}
          style={{
            padding: "8px 12px",
            backgroundColor: editingId ? "#007bff" : "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: (isPending || !currentUser) ? "not-allowed" : "pointer",
            marginRight: "5px",
            opacity: (!currentUser || isPending) ? 0.6 : 1
          }}
        >
          {isPending ? "Procesando..." : editingId ? "Actualizar" : "Guardar"}
        </button>
        
        {editingId && (
          <button
            onClick={handleCancel}
            disabled={isPending}
            style={{
              padding: "8px 12px",
              backgroundColor: "#6c757d",
              color: "#6a6363ff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Cancelar
          </button>
        )}
      </div>

      {/* Estado de carga */}
      {isPending && <p>🔄 Procesando...</p>}

      {/* Lista de usuarios */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {results.length === 0 && !isPending ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          results.map((item) => (
            <li
              key={item.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #746767ff",
                borderRadius: "8px",
                maxWidth: "400px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: editingId === item.id ? "#2b2c2dff" : "white"
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: "bold" }}>{item.name}</div>
                {item.userEmail && (
                  <div style={{ fontSize: "0.8em", color: "#666" }}>
                    Creado por: {item.userEmail}
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(item)}
                  disabled={isPending}
                  style={{
                    marginRight: "8px",
                    padding: "5px 8px",
                    backgroundColor: "#ffc107",
                    color: "#000",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isPending}
                  style={{
                    padding: "5px 8px",
                    backgroundColor: "#dc3545",
                    color: "#4d4242ff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Botón para refrescar manualmente si es necesario */}
      <button
        onClick={() => getAll()}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          backgroundColor: "#17a2b8",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        🔄 Refrescar Datos
      </button>
    </div>
  );
}