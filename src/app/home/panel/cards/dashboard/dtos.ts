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
  textY?: string
}

export const DonutColors = [
  '#266dde',
  '#4552d9',
  '#5734d9',
  '#8d36e0',
  '#c035de',
  '#db42c9',
  '#de3597',
  '#e03464'
];
