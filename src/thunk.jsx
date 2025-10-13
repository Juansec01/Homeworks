// src/thunk.jsx
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase/config";
import { checkingCredentials, login, logout } from "./authSlice";

/* =========================================================================
   🔹 REGISTRO CON EMAIL Y PASSWORD
   ========================================================================== */
export const registerAuth = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      // Crear usuario
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Actualizar perfil (solo para mostrar nombre)
      await updateProfile(auth.currentUser, {
        displayName: email.split("@")[0],
      });

      const user = result.user;
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || email.split("@")[0],
          photoURL: user.photoURL || null,
        })
      );
      console.log("✅ Usuario registrado:", user.email);
    } catch (error) {
      console.error("❌ Error al registrar:", error.code, error.message);
      dispatch(logout({ errorMessage: error.message }));
    }
  };
};

/* =========================================================================
   🔹 LOGIN CON EMAIL Y PASSWORD
   ========================================================================== */
export const loginAuth = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
      console.log("✅ Login correcto:", user.email);
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error.code, error.message);
      dispatch(logout({ errorMessage: error.message }));
    }
  };
};

/* =========================================================================
   🔹 LOGIN CON GOOGLE
   ========================================================================== */
export const loginWithGoogle = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );

      console.log("✅ Login con Google exitoso:", user.email);
    } catch (error) {
      // Logs más claros para depuración
      console.error(
        "❌ Error en Login con Google:",
        error.code,
        error.message
      );

      // Casos comunes
      if (error.code === "auth/operation-not-allowed") {
        console.warn(
          "⚠️ Debes habilitar el método de Google en Firebase > Authentication > Métodos de acceso"
        );
      }
      if (error.code === "auth/unauthorized-domain") {
        console.warn(
          "⚠️ Debes agregar tu dominio (por ejemplo localhost) en Firebase > Authentication > Configuración > Dominios autorizados"
        );
      }

      dispatch(logout({ errorMessage: error.message }));
    }
  };
};

/* =========================================================================
   🔹 LOGOUT
   ========================================================================== */
export const logoutAuth = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logout());
      console.log(" Usuario cerró sesión correctamente");
    } catch (error) {
      console.error(" Error al cerrar sesión:", error.code, error.message);
    }
  };
};
