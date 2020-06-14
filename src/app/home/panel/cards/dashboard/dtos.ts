export interface DaysInMonthDto {
  date: string;
  day: string;
  month: string;
}

export interface TransactionAfterSumDto {
  date: string;
  amount: number;
}

export const MonthsDictionary = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
};
