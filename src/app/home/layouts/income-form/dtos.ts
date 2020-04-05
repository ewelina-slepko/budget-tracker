export interface IncomeDaysDto {
  active: number;
  previous: number;
  next: number;
  isSwipingUp: boolean;
  isSwipingDown: boolean;
}

export interface IncomeFormDto {
  Name: string;
  Amount: number;
}
