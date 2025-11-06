import React from "react";
import styles from "./PersonCard.module.scss";

export default function PersonCard({ person }) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>{person.name.charAt(0)}</div>
      <div className={styles.info}>
        <h3>{person.name}</h3>
        <p>{person.city}</p>
      </div>
    </div>
  );
}
