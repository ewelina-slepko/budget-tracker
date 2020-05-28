import {Component, Input, OnInit} from '@angular/core';
import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';
import {transformToDate} from '../../../../../shared/utilities';
import {ApiService} from '../../../../../shared/services/api.service';

@Component({
  selector: 'transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent {

  @Input() transaction: TransactionDto;
  transformToDate = transformToDate;

  constructor(private apiService: ApiService) {
  }

  removeTransaction(id) {
    this.apiService.removeTransaction(id);
  }
}
