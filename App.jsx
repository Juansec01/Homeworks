import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register"; 
import Dashboard from "./Dashboard";

function Navbar() {
  return (
    <header className="header">
      <h1>🚀 Demo App</h1>
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="container">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {}

            {/* Ruta privada */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Ruta fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
