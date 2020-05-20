import {TimestampDto} from '../../../../shared/dtos';

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
  date: TimestampDto;
  budgetId: string;
  uid: string;
  id: string;
}
