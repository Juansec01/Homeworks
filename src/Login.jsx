// src/Login.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase/config";
import { loginStart, loginSuccess, loginFailure } from "./AuthSlice";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      let userCredential;
      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado:", userCredential.user);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario autenticado:", userCredential.user);
      }

      const { uid, email: userEmail } = userCredential.user;
      dispatch(loginSuccess({ uid, email: userEmail }));
      alert(`Sesión iniciada como: ${userEmail}`);
    } catch (error) {
      console.error("Error en login/registro:", error);
      dispatch(loginFailure(error.message));
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>{isRegister ? "Registro" : "Iniciar sesión"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">{isRegister ? "Registrar" : "Ingresar"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
      </button>
    </div>
  );
};

export default Login;
