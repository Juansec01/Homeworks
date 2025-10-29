import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{ width: "220px", backgroundColor: "#1a1a1a", padding: "20px", color: "white" }}>
      <h2>Menú</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/">Home</Link></li>

          <li><strong>Settings</strong></li>
          <ul>
            <li><Link to="/settings/profile">Profile</Link></li>
            <li><Link to="/settings/password">Password</Link></li>
            <li><Link to="/settings/notification">Notification</Link></li>
          </ul>

          <li><strong>Help</strong></li>
          <ul>
            <li><Link to="/help/faqs">Faqs</Link></li>
            <li><Link to="/help/tickets">Tickets</Link></li>
            <li><Link to="/help/status">Status</Link></li>
          </ul>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
