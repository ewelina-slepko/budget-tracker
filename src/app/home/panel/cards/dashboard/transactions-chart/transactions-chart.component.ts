import {Component, Input, OnInit} from '@angular/core';
import {DaysInMonthDto, MonthsDictionary, TransactionAfterSumDto} from '../dtos';
import * as moment from 'moment';
import {getDaysInMonth} from '../../../../../shared/utilities';
import {ApiService} from '../../../../../shared/services/api.service';
import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';

@Component({
  selector: 'transactions-chart',
  templateUrl: './transactions-chart.component.html',
  styleUrls: ['./transactions-chart.component.scss'],
})
export class TransactionsChartComponent implements OnInit {

  @Input() transactionsList: TransactionDto[];

  transactionsListAfterSum: TransactionAfterSumDto[];
  daysVisibleOnChart: DaysInMonthDto[];
  yAxisAmounts: number[] = [];
  monthDictionary = MonthsDictionary;

  highestAmount: number;
  today: string;
  maxNumber: number;


  constructor() {
  }

  ngOnInit() {
    this.setDataVisibleOnChart();
  }

  calculateBarHeight(transactionAmount, totalAmount) {
    return transactionAmount / totalAmount;
  }

  setDataVisibleOnChart() {
    this.today = moment().format('DD/MM/YYYY');

    const currentMonthDate = moment();
    const previousMonthDate = currentMonthDate.clone().subtract(1, 'month');

    const previousAndCurrentMonth = [...getDaysInMonth(previousMonthDate), ...getDaysInMonth(currentMonthDate)];
    const todayIndex = previousAndCurrentMonth.indexOf(this.today);


    this.daysVisibleOnChart = previousAndCurrentMonth
      .filter((day, i) => i <= todayIndex && i > todayIndex - 12)
      .map(date => (
        {
          date,
          day: date.slice(0, 2),
          month: date.slice(3, 5)
        }
      ));
    this.getAndTransformTransactionsList(this.daysVisibleOnChart);
  }

  getAndTransformTransactionsList(daysVisibleOnChart: DaysInMonthDto[]) {
    const transactionsList = this.transactionsList
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
  }

  calculateYAxisAmounts() {
    this.highestAmount = (100 * Math.ceil(this.highestAmount / 100));
    for (let i = 0; i <= this.highestAmount; i += 100) {
      this.yAxisAmounts.push(i);
    }
    const minLegendDataNumber = 5;
    this.yAxisAmounts = this.yAxisAmounts
      .filter((amount, index) => index % (Math.round(
        this.yAxisAmounts.length / minLegendDataNumber)) === 0 || amount === 0 || index === this.yAxisAmounts.length - 1)
      .removeDuplicates()
      .sortDescendingly();
    this.maxNumber = this.yAxisAmounts.map(num => num).maxNumber();
  }
}
