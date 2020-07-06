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
  '#4E4BED',
  '#5FB7D4',
  '#27c7ac',
  '#52D726',
  '#bcd60b',
  '#FFAF00',
  '#FF7300',
  '#E01E84',
  '#C758D0',
  '#8E6CEF'
];
