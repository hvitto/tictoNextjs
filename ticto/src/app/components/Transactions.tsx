"use client";

import { Transaction } from "@/app/types/transactions";
import styles from "@/app/styles/Transactions.module.scss";

const fmtDateTime = (d: Date | string) => {
  const date = d instanceof Date ? d : new Date(d);
  const day = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(date);
  const time = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(date);
  return `${day} às ${time}`;
};

interface Props {
  transactions: Transaction[];
  onDelete: (id: Transaction["id"]) => void;
}

export default function Transactions({ transactions, onDelete }: Props) {
  return (
    <div className={styles.summarybox}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th className={styles.actionsCol}>Ações</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "#6b7280", padding: "12px" }}>
                Nenhuma transação cadastrada
              </td>
            </tr>
          ) : (
            transactions.map((t: Transaction) => (
              <tr key={String(t.id)}>
                <td>{t.title}</td>

                <td className={t.type === "entrada" ? styles.entrada : styles.saida}>
                  {t.type === "saida" ? "- " : ""}R$ {t.amount.toLocaleString("pt-BR")}
                </td>

                <td>{t.category}</td>

                <td>
                  <time dateTime={t.createdAt instanceof Date ? t.createdAt.toISOString() : t.createdAt}>
                    {fmtDateTime(t.createdAt)}
                  </time>
                </td>

                <td className={styles.actions}>
                  <button
                    type="button"
                    className={styles.trashBtn}
                    aria-label={`Excluir ${t.title}`}
                    onClick={() => onDelete(t.id as Transaction["id"])}
                    title="Excluir"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.trashIcon}
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6V4h8v2" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v7M14 11v7" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
