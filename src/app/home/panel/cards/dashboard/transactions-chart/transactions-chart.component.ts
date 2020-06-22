import {Component, Input, OnInit} from '@angular/core';
import {TransactionAfterSumDto} from '../dtos';
import * as moment from 'moment';
import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';

@Component({
  selector: 'transactions-chart',
  templateUrl: './transactions-chart.component.html',
  styleUrls: ['./transactions-chart.component.scss'],
})
export class TransactionsChartComponent implements OnInit {

  @Input() transactionsList: TransactionDto[];

  transactionsListAfterSum: TransactionAfterSumDto[];
  daysVisibleOnChart: Date[];
  yAxisAmounts: number[] = [];
  highestAmount: number;
  maxNumber: number;

  ngOnInit() {
    this.setDataVisibleOnChart();
  }

  calculateBarHeight(transactionAmount, totalAmount) {
    return transactionAmount / totalAmount;
  }

  setDataVisibleOnChart() {
    this.daysVisibleOnChart = new Array(12)
      .fill(moment())
      .map((day, index) => day.clone().subtract(index, 'days').toDate())
      .reverse();

    this.getAndTransformTransactionsList(this.daysVisibleOnChart);
  }

  getAndTransformTransactionsList(daysVisibleOnChart: Date[]) {
    this.transactionsListAfterSum = this.transactionsList
      .map(({date, ...rest}) => ({
        date: moment.unix(date.seconds).toDate(),
        ...rest
      }))
      .sumDuplicatedDaysAmounts()
      .filter(transaction => daysVisibleOnChart.some(item => item.isSameDate(transaction.date)));

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
