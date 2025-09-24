import React, { useState } from "react";
import Queue from "./Queue";
import "./App.css";

const App = () => {
  const [queue] = useState(() => {
    const q = new Queue();
    // Datos iniciales de ejemplo
    q.enqueue({ nombre: "Juan", monto: 200 });
    q.enqueue({ nombre: "Ana", monto: 500 });
    q.enqueue({ nombre: "Carlos", monto: 100 });
    return q;
  });

  const [personas, setPersonas] = useState(queue.getAll());
  const [formData, setFormData] = useState({ nombre: "", monto: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.monto) return;

    queue.enqueue({
      nombre: formData.nombre,
      monto: parseFloat(formData.monto),
    });
    setPersonas([...queue.getAll()]);
    setFormData({ nombre: "", monto: "" });
  };

  const handleAtender = () => {
    queue.dequeue();
    setPersonas([...queue.getAll()]);
  };

  return (
    <div className="app-container">
      <h1>Cola de Personas en el Cajero</h1>

      <form className="persona-form" onSubmit={handleAgregar}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la persona"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="number"
          name="monto"
          placeholder="Monto a retirar"
          value={formData.monto}
          onChange={handleChange}
        />
        <button type="submit">Agregar a la cola</button>
      </form>

      <div className="queue-section">
        <h2>Personas en la cola</h2>
        {personas.length === 0 ? (
          <p>No hay personas en la cola.</p>
        ) : (
          <ul>
            {personas.map((p, index) => (
              <li key={index}>
                <strong>{p.nombre}</strong> → ${p.monto}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="serve-btn"
        onClick={handleAtender}
        disabled={personas.length === 0}
      >
        Atender siguiente
      </button>
    </div>
  );
};

export default App;
