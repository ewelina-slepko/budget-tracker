import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {ApiService} from '../../../../shared/services/api.service';
import {saveDocumentWithId} from '../../../../shared/utilities';
import {TransactionDto} from '../../../shared/forms/transaction-form/dtos';
import {formAnimation} from '../../../../shared/animations/form-animation';
import {TransactionFilters} from './transactions-list/dtos';
import {PanelService} from '../../panel.service';
import {StandardFilter} from './filter-form/dtos';
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

  standardFilters: StandardFilter[] = [];
  budgetsFilters: BudgetDto[] = [];

  constructor(private apiService: ApiService,
              private panelService: PanelService) {
  }

  ngOnInit() {
    this.setAllTransactionsView();
    this.listenOnFiltersData();
  }

  listenOnFiltersData() {
    this.panelService.getStandardTransactionsListFilters().subscribe(filters => {
      this.standardFilters = filters;
      this.setStandardFilters(this.standardFilters);
    });
    this.panelService.getBudgetsTransactionsListFilters().subscribe(filters => {
      this.budgetsFilters = filters;
      this.setBudgetsFilters(this.budgetsFilters);
    });
  }

  getTransactionsList(standardFilters: StandardFilter[] = null, budgetsFilters: BudgetDto[] = null, isRepetitiveView: boolean = false) {
    this.apiService.getTransactionsList().subscribe(res => {
      this.transactionsList = saveDocumentWithId(res).sortByDate();

      if (standardFilters) {
        this.setStandardFilters(standardFilters);
      }

      if (budgetsFilters && budgetsFilters.length > 0) {
        this.setBudgetsFilters(budgetsFilters);
      }

      if (isRepetitiveView) {
        this.setRepetitiveFilter();
      }
    });
  }

  setStandardFilters(filters: StandardFilter[]) {
    this.transactionsList = this.transactionsList.filter(transaction => filters.every(filter => filter.filterFunction(transaction)));
  }

  setBudgetsFilters(budgets: BudgetDto[]) {
    this.transactionsList = this.transactionsList.filter(transaction => budgets.some(budget => budget.id === transaction.budgetId));
  }

  setRepetitiveFilter() {
    this.transactionsList = this.transactionsList.filter(transaction => transaction.repeat);
  }

  removeStandardFilter(index: number) {
    this.standardFilters.splice(index, 1);
    this.getTransactionsList(this.standardFilters, this.budgetsFilters);
  }

  removeBudgetFilter(index: number) {
    this.budgetsFilters.splice(index, 1);
    this.getTransactionsList(this.standardFilters, this.budgetsFilters);
  }

  setAllTransactionsView() {
    this.setView(this.transactionFilters.all);
    this.getTransactionsList(this.standardFilters, this.budgetsFilters);
  }

  setRepetitiveTransactionsView() {
    this.setView(this.transactionFilters.repetitive);
    this.getTransactionsList(this.standardFilters, this.budgetsFilters, !this.isAllTransactionsView);
  }

  setView(filter: string) {
    this.isAllTransactionsView = filter === this.transactionFilters.all;
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

  get noDataAfterFilter() {
    return (this.standardFilters?.length > 0 || this.budgetsFilters?.length > 0) && this.transactionsList?.length === 0;
  }
}
