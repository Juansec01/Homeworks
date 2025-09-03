import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Panel() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        <h1>📊 Panel de Control</h1>
        <div className="welcome-section">
          <h2>Bienvenido, <span className="username">{usuario.nombre}</span>!</h2>
          <p>Has accedido al área privada de la aplicación.</p>
        </div>
        
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>📈 Estadísticas</h3>
            <p>Revisa tus métricas y progreso.</p>
            <button className="card-button">Ver estadísticas</button>
          </div>
          
          <div className="dashboard-card">
            <h3>⚙️ Configuración</h3>
            <p>Personaliza tu experiencia.</p>
            <button className="card-button">Ajustes</button>
          </div>
          
          <div className="dashboard-card">
            <h3>👥 Perfil</h3>
            <p>Gestiona tu información personal.</p>
            <button className="card-button">Editar perfil</button>
          </div>
        </div>
        
        <div className="logout-section">
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Panel;