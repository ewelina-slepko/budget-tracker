export interface IncomeDaysDto {
  active: number;
  isSwipingUp: boolean;
  isSwipingDown: boolean;
}

export interface IncomeDto {
  name: string;
  amount: number;
  incomeDay: number;
  uid: string;
}
