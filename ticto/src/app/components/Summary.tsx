"use client";

import { Transaction } from "@/app/types/transactions";
import styles from "@/app/styles/Summary.module.scss";

interface Props {
  transactions: Transaction[];
}

export default function Summary({ transactions }: Props) {
  const entradas = transactions
    .filter((t) => t.type === "entrada")
    .reduce((acc, t) => acc + t.amount, 0);

  const saidas = transactions
    .filter((t) => t.type === "saida")
    .reduce((acc, t) => acc + Math.abs (t.amount), 0);

  const total = entradas - saidas;

  return (
    <div className = {styles.box}>
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={`${styles.cornerIcon} ${styles.incomeIcon}`} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </span>
      <div className={styles.cardtext}><span>Entradas</span></div>
        <strong>R$ {entradas.toLocaleString()}</strong>
      </div>

      <div className={styles.cardtext}>
        <div className={styles.card}>
          <span className={`${styles.cornerIcon} ${styles.expenseIcon}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 7l10 10M9 17h8V9" />
      </svg>
    </span>
          <span>Saídas</span>
          <strong>R$ {saidas.toLocaleString()}</strong>
        </div>
      </div>
      <div className={styles.cardtext}>
        <div className={`${styles.card} ${styles.total}`}>
          <span>Saldo Total</span>
          <strong>R$ {total.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  </div>
  );
}
