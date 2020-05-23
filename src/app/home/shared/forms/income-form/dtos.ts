export interface IncomeDaysDto {
  active: number;
  isSwipingUp: boolean;
  isSwipingDown: boolean;
}

export interface NewIncomeRequest {
  name: string;
  amount: number;
  incomeDay: number;
  uid: string;
}

export interface IncomeDto extends NewIncomeRequest {
  id: string;
}
