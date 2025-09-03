import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Acceso() {
  const { login } = useAuth();
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const manejarLogin = () => {
    if (!nombre.trim()) {
      setError("Por favor ingresa un nombre de usuario");
      return;
    }
    
    setError("");
    login(nombre.trim() || "Invitado");
    navigate("/panel");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      manejarLogin();
    }
  };

  return (
    <div className="page-container">
      <div className="auth-form">
        <h2>🔐 Iniciar Sesión</h2>
        <p>Ingresa tu nombre de usuario para acceder al sistema</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        </div>
        
        <button onClick={manejarLogin} className="auth-button">
          Entrar
        </button>
        
        <div className="auth-hint">
          <p>💡 Puedes usar cualquier nombre, el sistema es de demostración.</p>
        </div>
      </div>
    </div>
  );
}

export default Acceso;