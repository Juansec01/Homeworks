import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { usuario, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🔐 AuthApp
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          {usuario ? (
            <>
              <Link to="/panel" className="nav-link">
                Panel
              </Link>
              <span className="user-greeting">Hola, {usuario.nombre}</span>
              <button onClick={logout} className="logout-btn">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/acceso" className="nav-link">
              Acceso
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;