import React from "react";

const Profile = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">👤 Perfil del Usuario</h1>
      <p className="text-gray-700 mb-2">
        Aquí puedes actualizar tu información personal, como nombre, correo electrónico y foto de perfil.
      </p>

      <form className="bg-white shadow p-4 rounded max-w-md">
        <label className="block mb-2">
          Nombre:
          <input type="text" className="border p-2 rounded w-full mt-1" placeholder="Tu nombre completo" />
        </label>
        <label className="block mb-2">
          Correo electrónico:
          <input type="email" className="border p-2 rounded w-full mt-1" placeholder="tu@email.com" />
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default Profile;
