"use client";

import { useState } from "react";
import Summary from "@/app/components/Summary";
import Transactions from "@/app/components/Transactions";
import NewTransactionModal from "@/app/components/NewTransactionModal";
import { Transaction } from "@/app/types/transactions";


export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  
  function handleAddTransaction(transaction: Transaction) {
    setTransactions([...transactions, transaction]);
  }
  

  return (
    <div>
      <header className="header">
        <style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");
</style>
        <h1 className = "title">TICTO</h1>
        <button onClick={() => setIsModalOpen(true)}>NOVA TRANSAÇÃO</button>
      </header>

      <Summary transactions={transactions} />
      <Transactions
        transactions={transactions}
        onDelete={(id) => setTransactions(transactions.filter((t) => t.id !== id))}
      />

      <NewTransactionModal       
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />
    </div>
  );
}
