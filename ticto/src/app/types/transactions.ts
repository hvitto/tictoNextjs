export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "entrada" | "saida";
  category: string;
  createdAt: Date;
}
