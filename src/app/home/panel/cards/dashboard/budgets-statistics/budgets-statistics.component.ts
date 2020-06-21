import {Component, Input, OnInit} from '@angular/core';
import {getDaysInMonth, saveDocumentWithId} from '../../../../../shared/utilities';
import * as moment from 'moment';
import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';
import {ApiService} from '../../../../../shared/services/api.service';
import {BudgetDto} from '../../../../shared/forms/budgets-form/dtos';

@Component({
  selector: 'budgets-statistics',
  templateUrl: './budgets-statistics.component.html',
  styleUrls: ['./budgets-statistics.component.scss']
})
export class BudgetsStatisticsComponent implements OnInit {

  @Input() transactionsList: TransactionDto[];
  budgetsList: BudgetDto[];
  budgetsPercentList;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getBudgetsList();
    this.calculateBudgetPercentInCurrentMonth();
  }

  getBudgetsList() {
    this.apiService.getBudgetsList().subscribe(res => {
      this.budgetsList = saveDocumentWithId(res);
    });
  }

  calculateBudgetPercentInCurrentMonth() {
    this.getCurrentMonthTransactionsList();
    const currentMonthBudgetsList = this.getCurrentMonthTransactionsList()
      .map(transaction => transaction.budgetId)
      .countDuplicates();

    const budgetsSum = Object.keys(currentMonthBudgetsList).map(key => currentMonthBudgetsList[key]).sum();
    this.budgetsPercentList = Object.keys(currentMonthBudgetsList).map(budget => (
      {
        [budget]: currentMonthBudgetsList[budget] / budgetsSum * 100
      }
    ));
  }

  getCurrentMonthTransactionsList() {
    const currentMonthDays = getDaysInMonth(moment());
    return this.transactionsList.map(({date, ...rest}) => (
      {
        date: moment(date.seconds * 1000).format('DD/MM/YYYY'),
        ...rest
      }
    )).filter(transaction => currentMonthDays.includes(transaction.date));
  }
}

