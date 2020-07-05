import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../../shared/services/api.service';
import {saveDocumentWithId} from '../../../../../shared/utilities';
import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';
import {BudgetDto} from '../../../../shared/forms/budgets-form/dtos';

@Component({
  selector: 'budgets-spending-statistics',
  templateUrl: './budgets-spending-statistics.component.html',
  styleUrls: ['./budgets-spending-statistics.component.scss']
})
export class BudgetsSpendingStatisticsComponent implements OnInit {

  budgetsList: BudgetDto[];
  transactionsList: TransactionDto[];
  currentMonthBudgets: string[];
  currentMonthBudgetsSpendingList;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.createBudgetsSpendingList();
  }

  createBudgetsSpendingList() {
    this.apiService.getBudgetsList().subscribe(res => {
      this.budgetsList = saveDocumentWithId(res);

      this.apiService.getTransactionsList().subscribe(res => {
        this.transactionsList = saveDocumentWithId(res);

        this.currentMonthBudgets = this.transactionsList.getCurrentMonthTransactions().sumDuplicatedBudgetsAmounts();
        this.currentMonthBudgetsSpendingList = Object.keys(this.currentMonthBudgets)
          .map(budgetId => (
            {
              budgetId: budgetId,
              name: this.budgetsList.filter(budget => budget.id === budgetId).map(({name}) => name).toString(),
              spendingAmount: this.currentMonthBudgets[budgetId],
              totalAmount: Number(this.budgetsList.filter(budget => budget.id === budgetId).map(({amount}) => amount))
            }
          ));
        console.log('currentMonth', this.currentMonthBudgetsSpendingList);
      });
    });
  }
}
