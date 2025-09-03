import { useAuth } from "./AuthContext";

function Inicio() {
  const { usuario } = useAuth();

  return (
    <div className="page-container">
      <h1>🏠 Página de Inicio</h1>
      <p>Bienvenido a nuestra aplicación de demostración con sistema de autenticación.</p>
      
      {usuario ? (
        <div className="auth-status logged-in">
          <h3>✅ Has iniciado sesión como: {usuario.nombre}</h3>
          <p>Ahora puedes acceder a todas las funcionalidades de la aplicación.</p>
        </div>
      ) : (
        <div className="auth-status logged-out">
          <h3>🔒 Sesión no iniciada</h3>
          <p>Inicia sesión para acceder a contenido exclusivo.</p>
        </div>
      )}
      
      <div className="features">
        <div className="feature-card">
          <h3>🚀 Característica 1</h3>
          <p>Funcionalidad avanzada disponible para usuarios registrados.</p>
        </div>
        <div className="feature-card">
          <h3>🎯 Característica 2</h3>
          <p>Acceso prioritario a nuevas actualizaciones.</p>
        </div>
        <div className="feature-card">
          <h3>📊 Característica 3</h3>
          <p>Panel de control personalizado para cada usuario.</p>
        </div>
      </div>
    </div>
  );
}

export default Inicio;