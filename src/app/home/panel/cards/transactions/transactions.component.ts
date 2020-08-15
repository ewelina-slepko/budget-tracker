import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {ApiService} from '../../../../shared/services/api.service';
import {saveDocumentWithId} from '../../../../shared/utilities';
import {TransactionDto} from '../../../shared/forms/transaction-form/dtos';
import {formAnimation} from '../../../../shared/animations/form-animation';
import {TransactionFilters} from './transactions-list/dtos';
import {PanelService} from '../../panel.service';
import * as moment from 'moment';

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
      this.transactionsList = this.transactionsList.filter(transaction => {
        const dateFilter = !res.date || res.date === ''
          || moment.unix(transaction.date.seconds).format('DD/MM/YYYY') === moment(res.date).format('DD/MM/YYYY');
        const amountFromFilter = !res.amountFrom || res.amountFrom === '' || transaction.amount >= res.amountFrom;
        const amountToFilter = !res.amountTo || res.amountTo === '' || transaction.amount <= res.amountTo;
        const budgetFilter = res.budgets.length === 0 || res.budgets.includes(transaction.budgetId);

        return dateFilter && amountFromFilter && amountToFilter && budgetFilter;
      });
    });
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
