import React from "react";

const Tickets = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">🎫 Crear Ticket de Soporte</h1>
      <p className="text-gray-700 mb-4">
        Describe tu problema o pregunta, y nuestro equipo te contactará pronto.
      </p>

      <form className="bg-white shadow p-4 rounded max-w-md">
        <label className="block mb-2">
          Asunto:
          <input type="text" className="border p-2 rounded w-full mt-1" placeholder="Motivo del ticket" />
        </label>
        <label className="block mb-2">
          Descripción:
          <textarea className="border p-2 rounded w-full mt-1" rows="4" placeholder="Describe tu problema aquí..." />
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700">
          Enviar Ticket
        </button>
      </form>
    </div>
  );
};

export default Tickets;
