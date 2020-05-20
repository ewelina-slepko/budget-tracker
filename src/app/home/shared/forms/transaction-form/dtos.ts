export interface NewTransactionRequest {
  name: string;
  amount: number;
  date: Date;
  budgetId: string;
  uid: string;
}

export interface TransactionDto {
  name: string;
  amount: number;
  date: any;
  budgetId: string;
  uid: string;
  id: string;
}
