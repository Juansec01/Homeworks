import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { setUser, clearError } from "./authSlice";
import LoginForm from "./LoginForm";
import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";
import { Registro } from "./register";
import Crud from "./Crud";
import Chat from "./Chat";

export default function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));
      } else {
        dispatch(setUser(null));
      }
      dispatch(clearError());
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading && !user) {
    return (
      <div className="p-5 text-center">
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  return (
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold mb-4">🔥 Firebase CRUD + Chat</h1>

      {user ? (
        <div>
          <p className="mb-4">Bienvenido, {user.email}</p>
          <LogoutButton />
          
          {/* Navegación entre CRUD y Chat */}
          <div style={{ margin: "20px 0" }}>
            <button
              onClick={() => window.location.reload()} // Simple reload para demo
              style={{
                margin: "0 10px",
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
               CRUD Usuarios
            </button>
            <button
              onClick={() => window.location.reload()} // Simple reload para demo  
              style={{
                margin: "0 10px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              💬 Mi Chat
            </button>
          </div>
          
          {/* Mostrar ambos componentes o alternar entre ellos */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <Crud />
            <Chat />
          </div>
        </div>
      ) : (
        <div>
          <Registro />
          <LoginForm />
          <GoogleLoginButton />
        </div>
      )}
    </div>
  );
}