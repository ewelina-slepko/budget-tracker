export interface TransactionAfterSumDto {
  date: Date;
  amount: number;
}

export interface BudgetsPercentListDto {
  budgetId: string;
  name: string;
  color: string;
  percentage: number;
  degrees?: number;
  textX?: string;
  textY?: string;
}

export const DonutColors = [
  '#963fe8',
  '#654ac7',
  '#5b67dc',
  '#4785e8',
  '#3eaadc',
  '#d5567a',
  '#d950a0'
];
