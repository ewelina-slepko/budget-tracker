import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {ApiService} from '../../../../shared/services/api.service';
import {WalletDto} from '../../../shared/forms/wallet-form/dtos';
import {getDaysInMonth, saveDocumentWithId} from '../../../../shared/utilities';
import * as moment from 'moment';
import {daysInMonthDto} from './dtos';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: basicAnimation
})
export class DashboardComponent implements OnInit {

  userName: string;
  totalAmountOfMoney: number;
  highestAmount: number;
  today: string;

  walletList: WalletDto[];
  transactionsListAfterSum;
  daysVisibleOnChart: daysInMonthDto[];

  constructor(private authService: AuthenticationService,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.userName = this.authService.currentUser.displayName;
    this.getWalletList();
    this.getAndTransformTransactionsList();
    this.getDaysInMonthAndTransformToObject();
  }

  getWalletList() {
    this.apiService.getWalletList().subscribe((res) => {
      this.walletList = res;
      this.totalAmountOfMoney = this.walletList.map(({amount}) => amount).sum();
    });
  }

  getAndTransformTransactionsList() {
    this.apiService.getTransactionsList().subscribe(res => {
      const transactionsList = saveDocumentWithId(res)
        .map(({date, ...rest}) => (
          {
            date: moment.unix(date.seconds).format('DD/MM/YYYY'),
            ...rest
          }
        ));
      this.transactionsListAfterSum = transactionsList.sumDuplicatedDaysAmounts();
      this.highestAmount = this.transactionsListAfterSum.map(transaction => transaction.amount).maxNumber();
    });
  }

  calculateBarHeight(transactionAmount, totalAmount) {
    return (100 * transactionAmount) / totalAmount;
  }

  get isWalletListEmpty() {
    return this.walletList?.length === 0;
  }

  getDaysInMonthAndTransformToObject() {
    this.today = moment().format('DD/MM/YYYY');

    const currentMonthDate = moment();
    const previousMonthDate = moment().subtract(1, 'month').add(1, 'day');

    const previousAndCurrentMonth = getDaysInMonth(previousMonthDate).concat(getDaysInMonth(currentMonthDate));
    const todayIndex = previousAndCurrentMonth.indexOf(this.today);

    this.daysVisibleOnChart = previousAndCurrentMonth
      .filter((day, i) => i <= todayIndex && i > todayIndex - 18)
      .map(date => (
        {
          date,
          day: date.slice(0, 2)
        }
      ));
  }
}
