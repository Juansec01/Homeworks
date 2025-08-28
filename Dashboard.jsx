import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirige después de cerrar sesión
  };

  return (
    <div className="container">
      <h2>🎉 Bienvenido {user.username}</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;
