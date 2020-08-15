import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';

export enum FilterType {
  Incomes = 'Incomes',
  Outcomes = 'Outcomes'
}

export interface TransactionsFilterDto {
  name: string;
  value: any;
  condition: boolean;
}

export type Filter = {
  name: string;
  filterFunction: (transaction: TransactionDto) => boolean;
}
