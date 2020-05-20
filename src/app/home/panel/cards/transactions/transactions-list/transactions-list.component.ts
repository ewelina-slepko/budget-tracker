import {Component, Input} from '@angular/core';
import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';
import {transformToDate} from '../../../../../shared/utilities';

@Component({
  selector: 'transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent {

  @Input() transaction: TransactionDto;
  transformToDate = transformToDate;

}
