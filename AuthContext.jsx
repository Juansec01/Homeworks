import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Usuarios iniciales
  const [users, setUsers] = useState([
    { username: "admin", password: "1234", name: "Sebastian Castillo" },
  ]);

  const login = (username, password) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser({ username: foundUser.name });
      return { success: true };
    } else {
      return { success: false, message: "Usuario o contraseña incorrectos" };
    }
  };

  const register = (username, password, name) => {
    const exists = users.find((u) => u.username === username);

    if (exists) {
      return { success: false, message: "El usuario ya existe" };
    }

    const newUser = { username, password, name };
    setUsers([...users, newUser]);
    return { success: true, message: "Usuario registrado con éxito" };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => useContext(AuthContext);
