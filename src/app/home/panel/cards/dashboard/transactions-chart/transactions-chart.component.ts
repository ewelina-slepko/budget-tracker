import {Component, OnInit} from '@angular/core';
import {DaysInMonthDto, TransactionAfterSumDto} from '../dtos';
import * as moment from 'moment';
import {getDaysInMonth, saveDocumentWithId} from '../../../../../shared/utilities';
import {ApiService} from '../../../../../shared/services/api.service';

@Component({
  selector: 'transactions-chart',
  templateUrl: './transactions-chart.component.html',
  styleUrls: ['./transactions-chart.component.scss']
})
export class TransactionsChartComponent implements OnInit {

  transactionsListAfterSum: TransactionAfterSumDto[];
  daysVisibleOnChart: DaysInMonthDto[];
  yAxisAmounts: number[] = [];

  highestAmount: number;
  today: string;
  maxNumber: number;

  constructor(private apiService: ApiService) {
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

  getAndTransformTransactionsList(daysVisibleOnChart: DaysInMonthDto[]) {
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

  calculateYAxisAmounts() {
    this.highestAmount = (100 * Math.ceil(this.highestAmount / 100));
    for (let i = 0; i <= this.highestAmount; i += 100) {
      this.yAxisAmounts.push(i);
    }
    const legendDataNumber = 6;
    this.yAxisAmounts = this.yAxisAmounts
      .filter((amount, index) => index % (Math.round(this.yAxisAmounts.length / legendDataNumber)) === 0 || amount === 0)
      .removeDuplicates()
      .sortDescendingly();
    this.maxNumber = this.yAxisAmounts.map(num => num).maxNumber();
  }
}
