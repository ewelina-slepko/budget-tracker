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
  yAxisAmounts = [];
  roundedUp;
  maxNumber: number;

  constructor(private authService: AuthenticationService,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.userName = this.authService.currentUser.displayName;
    this.getWalletList();
    this.getDaysInMonthAndTransformToObject();
  }

  getWalletList() {
    this.apiService.getWalletList().subscribe((res) => {
      this.walletList = res;
      this.totalAmountOfMoney = this.walletList.map(({amount}) => amount).sum();
    });
  }

  getAndTransformTransactionsList(daysVisibleOnChart: daysInMonthDto[]) {
    this.apiService.getTransactionsList().subscribe(res => {
      const transactionsList = saveDocumentWithId(res)
        .map(({date, ...rest}) => (
          {
            date: moment.unix(date.seconds).format('DD/MM/YYYY'),
            ...rest
          }
        ));
      this.transactionsListAfterSum = transactionsList
        .sumDuplicatedDaysAmounts()
        .filter(transaction => daysVisibleOnChart.map(day => day.date).includes(transaction.date));

      this.highestAmount = this.transactionsListAfterSum.map(transaction => transaction.amount).maxNumber();
      this.calculateYAxisAmounts();
    });
  }

  calculateBarHeight(transactionAmount, totalAmount) {
    return transactionAmount / totalAmount;
  }

  calculateYAxisAmounts() {
    this.highestAmount = (100 * Math.ceil(this.highestAmount / 100));
    for (let i = 0; i <= this.highestAmount; i += 100) {
      this.yAxisAmounts.push(i);
    }
    this.yAxisAmounts = this.yAxisAmounts.reverse().filter((amount, index) => index % (Math.round(this.yAxisAmounts.length / 6)) === 0 || amount === 0);
    this.maxNumber = this.yAxisAmounts.map(num => num).maxNumber();
    console.log(this.maxNumber);
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
      .filter((day, i) => i <= todayIndex && i > todayIndex - 12)
      .map(date => (
        {
          date,
          day: date.slice(0, 2)
        }
      ));
    this.getAndTransformTransactionsList(this.daysVisibleOnChart);
  }
}
