import { useDispatch } from "react-redux";
import { logoutUser } from "./thunk";

export default function LogoutButton() {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(logoutUser())}
      className="bg-gray-700 text-white p-2 rounded mt-4"
    >
      Logout
    </button>
  );
}
