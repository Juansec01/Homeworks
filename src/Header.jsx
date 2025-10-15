import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";

const Header = () => {
  const count = useSelector((state) => state.notifications.list.length);

  return (
    <header>
      <h1>Red Social UAO</h1>
      <div className="notifications">Notificaciones: {count}</div>
    </header>
  );
};

export default Header;
