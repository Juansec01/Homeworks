import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { Registro } from "./register";
import { loginAuth, loginWithGoogle, logoutAuth } from "./thunk";
import "./App.css";

const AuthPanel = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: "juan@example.com",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAuth(form.email, form.password));
  };

  const handleGoogle = () => dispatch(loginWithGoogle());
  const handleLogout = () => dispatch(logoutAuth());

  if (auth.status === "authenticated") {
    return (
      <div>
        <h2>Bienvenido, {auth.displayName || auth.email}</h2>
        {auth.photoURL && <img src={auth.photoURL} alt="avatar" width={80} />}
        <p>Email: {auth.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      {auth.errorMessage && <p style={{ color: "red" }}>{auth.errorMessage}</p>}

      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={onChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      <button onClick={handleGoogle}>Login with Google</button>

      <hr />
      <Registro />
    </div>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AuthPanel />
      </div>
    </Provider>
  );
}
