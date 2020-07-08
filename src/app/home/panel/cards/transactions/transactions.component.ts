import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {ApiService} from '../../../../shared/services/api.service';
import {saveDocumentWithId} from '../../../../shared/utilities';
import {TransactionDto} from '../../../shared/forms/transaction-form/dtos';
import {formAnimation} from '../../../../shared/animations/form-animation';
import {TransactionFilters} from './transactions-list/dtos';

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

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.setAllTransactions();
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
