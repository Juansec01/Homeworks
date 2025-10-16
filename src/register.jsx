import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "./thunk";

export const Registro = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email: form.email, password: form.password })); // ✅ CORREGIR
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={onChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};