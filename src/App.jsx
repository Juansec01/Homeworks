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
      <h1 className="text-2xl font-bold mb-4">🔥 Firebase CRUD + Login</h1>

      {user ? (
        <div>
          <p className="mb-4">Bienvenido, {user.email}</p>
          <LogoutButton />
          <Crud />
        </div>
      ) : (
        <div>
          <Registro /> {/* ✅ AÑADIR COMPONENTE DE REGISTRO */}
          <LoginForm />
          <GoogleLoginButton />
        </div>
      )}
    </div>
  );
}