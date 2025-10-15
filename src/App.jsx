import { useSelector } from "react-redux";
import LoginForm from "./loginForm";
import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";

export default function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold mb-4">🔥 Login con Firebase + Redux</h1>
      {user ? (
        <>
          <p className="mb-4">Bienvenido, {user.email}</p>
          <LogoutButton />
        </>
      ) : (
        <>
          <LoginForm />
          <GoogleLoginButton />
        </>
      )}
    </div>
  );
}
