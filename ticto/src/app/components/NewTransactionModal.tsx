"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/app/types/transactions";
import styles from "@/app/styles/Modal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: Transaction) => void;
}

export default function NewTransactionModal({ isOpen, onClose, onAdd }: Props) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<"entrada" | "saida">("entrada");
  const [category, setCategory] = useState("");

  const [render, setRender] = useState(isOpen);
  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const onAnimEnd = () => {
    if (!isOpen) setRender(false);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!render) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || amount === "" || !category.trim()) return;

    const value = Number(amount);
    const tx: Transaction = {
      id: Date.now(),
      title: title.trim(),
      amount: type === "saida" ? -Math.abs(value) : Math.abs(value),
      type,
      category: category.trim(),
      createdAt: new Date(),
    };

    onAdd(tx);
    setTitle("");
    setAmount("");
    setCategory("");
    setType("entrada");
    onClose();
  }

  return (
    <div
      className={styles.overlay}
      data-state={isOpen ? "open" : "closed"}
      onAnimationEnd={onAnimEnd}
      onClick={onClose}
    >
      <div
        className={styles.card}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" style={{ margin: "0 0 16px 0" }}>
          Cadastrar Transação
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            placeholder="Nome"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className={styles.input}
            type="number"
            inputMode="decimal"
            placeholder="Preço"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className={styles.typeRow}>
            <button
              type="button"
              className={`${styles.typeBtn} ${type === "entrada" ? styles.active : ""}`}
              onClick={() => setType("entrada")}
            >
              Entrada
            </button>
            <button
              type="button"
              className={`${styles.typeBtn} ${type === "saida" ? styles.active : ""}`}
              onClick={() => setType("saida")}
            >
              Saída
            </button>
          </div>

          <input
            className={styles.input}
            placeholder="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit" className={styles.submit}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
