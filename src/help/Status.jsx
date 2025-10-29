import React from "react";

const Status = () => {
  const tickets = [
    { id: 101, subject: "Error al iniciar sesión", status: "Resuelto" },
    { id: 102, subject: "Problema con notificaciones", status: "En progreso" },
    { id: 103, subject: "No puedo cambiar contraseña", status: "Abierto" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">📊 Estado de Tickets</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Asunto</th>
            <th className="p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id} className="border-t">
              <td className="p-2">{ticket.id}</td>
              <td className="p-2">{ticket.subject}</td>
              <td className="p-2 font-semibold">{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Status;
