import {Component, Input, OnInit} from '@angular/core';
import {getDaysInMonth, saveDocumentWithId} from '../../../../../shared/utilities';
import * as moment from 'moment';
import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';
import {ApiService} from '../../../../../shared/services/api.service';
import {BudgetDto} from '../../../../shared/forms/budgets-form/dtos';
import {DonutColors} from '../dtos';

@Component({
  selector: 'budgets-statistics',
  templateUrl: './budgets-statistics.component.html',
  styleUrls: ['./budgets-statistics.component.scss']
})
export class BudgetsStatisticsComponent implements OnInit {

  @Input() transactionsList: TransactionDto[];
  budgetsList: BudgetDto[];
  budgetsPercentList;
  donutColors = DonutColors;

  cx = 80;
  cy = 80;
  radius = 60;
  width = 30;
  angleOffset = -90;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getAndCalculateBudgetsPercentageInMonth();
  }

  getAndCalculateBudgetsPercentageInMonth() {
    this.apiService.getBudgetsList().subscribe(res => {
      this.budgetsList = saveDocumentWithId(res);
      this.calculatePercentage();
    });
  }

  calculatePercentage() {
    this.getCurrentMonthTransactionsList();
    const currentMonthBudgetsList = this.getCurrentMonthTransactionsList()
      .sumDuplicatedBudgetsAmounts();

    const budgetsSum = Object.keys(currentMonthBudgetsList).map(key => currentMonthBudgetsList[key]).sum();
    this.budgetsPercentList = Object.keys(currentMonthBudgetsList)
      .map((budgetId, i) => (
        {
          name: this.budgetsList.filter(budget => budget.id === budgetId).map(({name}) => name).toString(),
          percentage: currentMonthBudgetsList[budgetId] / budgetsSum,
          budgetId: budgetId,
        }
      ))
      .sort((a, b) => b.percentage - a.percentage)
      .map(({...rest}, i) => (
        {
          color: i <= this.donutColors.length - 1 ? this.donutColors[i] : `hsl(${Math.floor(Math.random() * 360) + 1}, 75%, 52%)`,
          ...rest
        }
      ));
    this.calculateChartData();
  }

  getCurrentMonthTransactionsList() {
    const currentMonthDays = getDaysInMonth(moment());
    return this.transactionsList.map(({date, ...rest}) => (
      {
        date: moment(date.seconds * 1000).format('DD/MM/YYYY'),
        ...rest
      }
    )).filter(transaction => currentMonthDays.includes(transaction.date));
  }

  returnCircumference(): number {
    return 2 * Math.PI * this.radius;
  }

  returnCircumferenceWithGap() {
    return this.returnCircumference() - 2;
  }

  calculateStrokeDashOffset(percentage, circumference) {
    const strokeDifference = percentage * circumference;
    return circumference - strokeDifference;
  }

  calculateChartData() {
    const degreesArray = [];
    this.budgetsPercentList.forEach((dataVal, index) => {
      degreesArray.push(this.angleOffset);
      this.angleOffset = dataVal.percentage * 360 + this.angleOffset;
    });

    this.budgetsPercentList = this.budgetsPercentList.map((values, i) => {
      return {
        ...values,
        degrees: degreesArray[i]
      };
    });
  }

  returnCircleTransformValue(index) {
    return `rotate(${this.budgetsPercentList[index].degrees}, ${this.cx}, ${this.cy})`;
  }
}


