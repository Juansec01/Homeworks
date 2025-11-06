import React from "react";
import PersonCard from "./PersonCard";
import styles from "./CityList.module.scss";

export default function CityList({ people }) {
  return (
    <div className={styles.grid}>
      {people.map((p, index) => (
        <PersonCard key={index} person={p} />
      ))}
    </div>
  );
}
