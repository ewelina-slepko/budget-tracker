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
    this.listenOnAndSetListFilters();
  }

  getTransactionsList(standardFilters: StandardFilter[] = null, budgetsFilters: BudgetDto[] = null) {
    this.apiService.getTransactionsList().subscribe(res => {
      this.transactionsList = saveDocumentWithId(res).sortByDate();

      if (standardFilters) {
        this.useStandardFilters(standardFilters);
      }

      if (budgetsFilters && budgetsFilters.length > 0) {
        this.useBudgetsFilters(budgetsFilters);
      }
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

  listenOnAndSetListFilters() {
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

  removeStandardFilter(filterIndex: number) {
    this.standardFilters.splice(filterIndex, 1);
    this.getTransactionsList(this.standardFilters, this.budgetsFilters);
    console.log('standard filters', this.standardFilters, 'budgetsFilters', this.budgetsFilters);
  }

  removeBudgetFilter(filterIndex: number) {
    this.budgetsFilters.splice(filterIndex, 1);
    this.getTransactionsList(this.standardFilters, this.budgetsFilters);
    console.log('standard filters', this.standardFilters, 'budgetsFilters', this.budgetsFilters);
  }

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
