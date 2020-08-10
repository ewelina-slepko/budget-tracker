import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../../shared/services/api.service';
import {saveDocumentWithId} from '../../../../../shared/utilities';
import {BudgetDto} from '../../../../shared/forms/budgets-form/dtos';
import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';
import {CurrentMonthBudgetSpending} from './dtos';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'budgets-spending',
  templateUrl: './budgets-spending.component.html',
  styleUrls: ['./budgets-spending.component.scss']
})
export class BudgetsSpendingComponent implements OnInit {

  currentMonthBudgetsSpendingList: CurrentMonthBudgetSpending[];

  constructor(private apiService: ApiService,
              private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.createBudgetsSpendingList();
  }

  createBudgetsSpendingList() {
    this.apiService.getBudgetsList().subscribe(res => {
      const budgetsList: BudgetDto[] = saveDocumentWithId(res);

      this.apiService.getTransactionsList().subscribe(res => {
        const transactionsList: TransactionDto[] = saveDocumentWithId(res);

        const currentMonthBudgets: BudgetDto[] = transactionsList.getCurrentMonthTransactions().sumDuplicatedBudgetsAmounts();
        this.currentMonthBudgetsSpendingList = Object.keys(currentMonthBudgets)
          .map(budgetId => (
            {
              budgetId,
              name: budgetsList.filter(budget => budget.id === budgetId).map(({name}) => name).toString(),
              spendingAmount: currentMonthBudgets[budgetId],
              totalAmount: Number(budgetsList.filter(budget => budget.id === budgetId).map(({amount}) => amount))
            }
          ));
        this.dashboardService.currentMonthBudgetsSpendingList = this.currentMonthBudgetsSpendingList;
      });
    });
  }
}
