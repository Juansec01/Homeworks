import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 space-y-2">
      <h2 className="text-lg font-bold mb-4">Menú</h2>

      <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
        Inicio
      </Link>

      <h3 className="mt-4 font-semibold">⚙️ Configuración</h3>
      <Link to="/settings/profile" className="block p-2 hover:bg-gray-700 rounded">
        Perfil
      </Link>
      <Link to="/settings/password" className="block p-2 hover:bg-gray-700 rounded">
        Contraseña
      </Link>
      <Link to="/settings/notification" className="block p-2 hover:bg-gray-700 rounded">
        Notificaciones
      </Link>

      <h3 className="mt-4 font-semibold">🆘 Ayuda</h3>
      <Link to="/help/faqs" className="block p-2 hover:bg-gray-700 rounded">
        FAQs
      </Link>
      <Link to="/help/ticket" className="block p-2 hover:bg-gray-700 rounded">
        Tickets
      </Link>
      <Link to="/help/status" className="block p-2 hover:bg-gray-700 rounded">
        Estado
      </Link>
    </div>
  );
};

export default Sidebar;
