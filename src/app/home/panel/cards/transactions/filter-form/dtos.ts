import {BudgetDtoWithSelection} from '../../../../shared/forms/budgets-form/dtos';

export enum FilterType {
  Incomes = 'Incomes',
  Outcomes = 'Outcomes'
}

export interface TransactionsListFiltersDto {
  date: any;
  amountFrom: any;
  amountTo: any;
  type: FilterType;
  budgets: string[];
}
