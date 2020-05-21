import {TimestampDto} from '../../../../shared/dtos';

export interface NewTransactionRequest {
  name: string;
  amount: number;
  date: Date;
  budgetId: string;
  uid: string;
}

export interface TransactionDto extends Omit<NewTransactionRequest, 'date'>  {
  date: TimestampDto;
  id: string;
}
