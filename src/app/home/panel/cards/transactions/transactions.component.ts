import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {ApiService} from '../../../../shared/services/api.service';
import {saveDocumentWithId} from '../../../../shared/utilities';
import {TransactionDto} from '../../../shared/forms/transaction-form/dtos';
import {formAnimation} from '../../../../shared/animations/form-animation';
import {TransactionFilters} from './transactions-list/dtos';
import {PanelService} from '../../panel.service';
import * as moment from 'moment';
import {StandardFilter, TransactionsFilterDto} from './filter-form/dtos';
import {BudgetDto} from '../../../shared/forms/budgets-form/dtos';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [basicAnimation, formAnimation]
})
export class TransactionsComponent implements OnInit {

  transactionsList: TransactionDto[];
  transactionFilters = TransactionFilters;
  isAllTransactionsView = true;
  isNewIncomeFormOpen = false;
  isFilterFormOpen = false;

  standardFilters: StandardFilter[];
  budgetsFilters: BudgetDto[];

  constructor(private apiService: ApiService,
              private panelService: PanelService) {
  }

  ngOnInit() {
    this.setAllTransactions();
    this.setTransactionsListFilters();
  }

  getTransactionsList() {
    this.apiService.getTransactionsList().subscribe(res => {
      this.transactionsList = saveDocumentWithId(res).sortByDate();
    });
  }

  setFilter(filter: string) {
    this.isAllTransactionsView = filter === this.transactionFilters.all;
  }

  setAllTransactions() {
    this.setFilter(this.transactionFilters.all);
    this.getTransactionsList();
  }

  setRepetitiveTransactions() {
    this.setFilter(this.transactionFilters.repetitive);
    this.transactionsList = this.transactionsList.filter(transaction => transaction.repeat);
  }

  setTransactionsListFilters() {
    this.panelService.getTransactionsListFilters().subscribe(res => {
      this.standardFilters = res;
      this.useStandardFilters(this.standardFilters);
    });
    this.panelService.getBudgetsTransactionsListFilters().subscribe(res => {
      this.budgetsFilters = res;
      this.useBudgetsFilters(this.budgetsFilters);
    });
  }

  useStandardFilters(filters: StandardFilter[]) {
    this.transactionsList = this.transactionsList.filter(transaction => filters.every(filter => filter.filterFunction(transaction)));
  }

  useBudgetsFilters(budgets: BudgetDto[]) {
    this.transactionsList = this.transactionsList.filter(transaction => budgets.some(budget => budget.id === transaction.budgetId));
  }

  // setFilterLabels(filter: TransactionsListFiltersDto) {
  //
  //   if (filter.date && filter.date !== '') {
  //     this.filterLabels.push(moment(filter.date).format('DD/MM/YYYY'));
  //   }
  //
  //   if (filter.amountFrom && filter.amountFrom !== '') {
  //     this.filterLabels.push(`min ${filter.amountFrom}zł`);
  //   }
  //
  //   if (filter.amountTo && filter.amountTo !== '') {
  //     this.filterLabels.push(`max ${filter.amountTo}zł`);
  //   }
  //
  //   if (filter.budgets.length > 0) {
  //
  //     this.apiService.getBudgetsList().subscribe(res => {
  //       saveDocumentWithId(res)
  //         .filter(budget => filter.budgets.includes(budget.id))
  //         .forEach(budget => this.filterLabels.push(budget.name));
  //     });
  //   }
  //
  //   console.log(this.filterLabels)
  // }

  get isTransactionsListEmpty() {
    return this.transactionsList?.length === 0;
  }

  openIncomeForm() {
    this.isNewIncomeFormOpen = true;
  }

  closeIncomeForm() {
    this.isNewIncomeFormOpen = false;
  }

  openFilterForm() {
    this.isFilterFormOpen = true;
  }

  closeFilterForm() {
    this.isFilterFormOpen = false;
  }
}
