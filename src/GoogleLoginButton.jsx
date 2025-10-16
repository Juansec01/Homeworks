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
      className="bg-red-600 text-white p-2 rounded mt-4"
    >
      Login con Google
    </button>
  );
}