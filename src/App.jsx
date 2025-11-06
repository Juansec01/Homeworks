import React, { useState } from "react";
import styles from "./App.module.scss";
import CityList from "./components/CityList";
import "../src/styles/main.scss";

function App() {
  const [city, setCity] = useState("");

  const people = [
    { name: "Ana", city: "Bogotá" },
    { name: "Luis", city: "Cali" },
    { name: "Sofía", city: "Medellín" },
    { name: "Carlos", city: "Bogotá" },
    { name: "Mariana", city: "Cali" },
  ];

  const filtered = city ? people.filter((p) => p.city === city) : people;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>City Friends Dashboard</h1>
        <p>Explore where your friends live across the country</p>
      </header>

      <div className={styles.filters}>
        <button
          className={!city ? styles.active : ""}
          onClick={() => setCity("")}
        >
          All
        </button>
        <button
          className={city === "Bogotá" ? styles.active : ""}
          onClick={() => setCity("Bogotá")}
        >
          Bogotá
        </button>
        <button
          className={city === "Cali" ? styles.active : ""}
          onClick={() => setCity("Cali")}
        >
          Cali
        </button>
        <button
          className={city === "Medellín" ? styles.active : ""}
          onClick={() => setCity("Medellín")}
        >
          Medellín
        </button>
      </div>

      <CityList people={filtered} />
    </div>
  );
}

export default App;
