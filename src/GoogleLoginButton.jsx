import { useDispatch } from "react-redux";
import { loginWithGoogle } from "./thunk";

export default function GoogleLoginButton() {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow transition-all duration-200 ease-in-out w-full"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google logo"
        className="w-5 h-5"
      />
      <span>Iniciar sesión con Google</span>
    </button>
  );
}
