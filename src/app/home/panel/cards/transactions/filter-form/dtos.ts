import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';

export enum FilterType {
  Incomes = 'Incomes',
  Outcomes = 'Outcomes'
}

export type StandardFilter = {
  name: string;
  filterFunction: (transaction: TransactionDto) => boolean;
}
