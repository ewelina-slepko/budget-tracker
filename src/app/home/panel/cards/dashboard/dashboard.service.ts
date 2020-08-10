import {Injectable} from '@angular/core';
import {BudgetsPercentListDto, TransactionAfterSumDto} from './dtos';
import {CurrentMonthBudgetSpending} from './budgets-spending/dtos';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  visibleTransactionList: TransactionAfterSumDto[] = [];
  currentMonthBudgetsPercentList: BudgetsPercentListDto[] = [];
  currentMonthBudgetsSpendingList: CurrentMonthBudgetSpending[] = [];

}
