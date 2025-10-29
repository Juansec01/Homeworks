import React from "react";

const Password = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">🔒 Cambiar Contraseña</h1>
      <p className="text-gray-700 mb-4">
        Usa este formulario para actualizar tu contraseña. Asegúrate de que sea segura y fácil de recordar.
      </p>

      <form className="bg-white shadow p-4 rounded max-w-md">
        <label className="block mb-2">
          Contraseña actual:
          <input type="password" className="border p-2 rounded w-full mt-1" />
        </label>
        <label className="block mb-2">
          Nueva contraseña:
          <input type="password" className="border p-2 rounded w-full mt-1" />
        </label>
        <label className="block mb-2">
          Confirmar nueva contraseña:
          <input type="password" className="border p-2 rounded w-full mt-1" />
        </label>
        <button className="bg-green-600 text-white px-4 py-2 rounded mt-3 hover:bg-green-700">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default Password;
