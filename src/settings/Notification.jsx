import React, { useState } from "react";

const Notification = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">🔔 Notificaciones</h1>
      <p className="text-gray-700 mb-4">
        Administra cómo deseas recibir alertas y mensajes del sistema.
      </p>

      <div className="bg-white shadow p-4 rounded max-w-md">
        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
            className="mr-2"
          />
          Recibir notificaciones por correo electrónico
        </label>

        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={smsNotif}
            onChange={() => setSmsNotif(!smsNotif)}
            className="mr-2"
          />
          Recibir notificaciones por SMS
        </label>

        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700">
          Guardar preferencias
        </button>
      </div>
    </div>
  );
};

export default Notification;
