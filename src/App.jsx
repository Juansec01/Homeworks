import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Profile from "./settings/Profile";
import Password from "./settings/Password";
import Notification from "./settings/Notification";
import Faqs from "./help/Faqs";
import Tickets from "./help/Tickets";
import Status from "./help/Status";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Sección de configuración */}
            <Route path="/settings/Profile" element={<Profile />} />
            <Route path="/settings/Password" element={<Password />} />
            <Route path="/settings/Notification" element={<Notification />} />

            {/* Sección de ayuda */}
            <Route path="/help/Faqs" element={<Faqs />} />
            <Route path="/help/Tickets" element={<Tickets />} />
            <Route path="/help/Status" element={<Status />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
