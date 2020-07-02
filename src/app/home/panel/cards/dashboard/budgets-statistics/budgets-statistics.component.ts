import {Component, Input, OnInit} from '@angular/core';
import {getDaysInMonth, saveDocumentWithId} from '../../../../../shared/utilities';
import * as moment from 'moment';
import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';
import {ApiService} from '../../../../../shared/services/api.service';
import {BudgetDto} from '../../../../shared/forms/budgets-form/dtos';
import {BudgetsPercentListDto, DonutColors} from '../dtos';

@Component({
  selector: 'budgets-statistics',
  templateUrl: './budgets-statistics.component.html',
  styleUrls: ['./budgets-statistics.component.scss']
})
export class BudgetsStatisticsComponent implements OnInit {

  @Input() transactionsList: TransactionDto[];
  budgetsList: BudgetDto[];
  budgetsPercentList: BudgetsPercentListDto[];

  //BASIC CHART PROPERTIES
  cx = 80;
  cy = 80;
  radius = 60;
  width = 30;
  angleOffset = -90;
  donutColors: string[] = DonutColors;

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
    const currentMonthBudgetsList: BudgetDto[] = this.getCurrentMonthTransactionsList().sumDuplicatedBudgetsAmounts();

    const budgetsSum: number = Object.keys(currentMonthBudgetsList).map(key => currentMonthBudgetsList[key]).sum();
    this.budgetsPercentList = Object.keys(currentMonthBudgetsList)
      .map((budgetId: string) => (
        {
          name: this.budgetsList.filter(budget => budget.id === budgetId).map(({name}) => name).toString(),
          percentage: currentMonthBudgetsList[budgetId] / budgetsSum,
          budgetId: budgetId,
        }
      ))
      .sort((a, b) => b.percentage - a.percentage)
      .map((rest, i) => (
        {
          color: i <= this.donutColors.length - 1 ? this.donutColors[i] : `hsl(${Math.floor(Math.random() * 360) + 1}, 75%, 52%)`,
          ...rest
        }
      ));
    this.calculateChartData();
  }

  getCurrentMonthTransactionsList() {
    const currentMonthDays: string[] = getDaysInMonth(moment());
    return this.transactionsList.map(({date, ...rest}) => (
      {
        date: moment(date.seconds * 1000).format('DD/MM/YYYY'),
        ...rest
      }
    )).filter(transaction => currentMonthDays.includes(transaction.date));
  }

  // THIS METHOD CALCULATE THE LENGTH OF THE CIRCLE
  returnCircumference(): number {
    return 2 * Math.PI * this.radius;
  }

  // THIS METHOD CALCULATE THE LENGTH OF THE CIRCLE AND ADD GAP BETWEEN SEGMENTS
  returnCircumferenceWithGap(): number {
    return this.returnCircumference() - 2;
  }

  // METHOD TO GET STROKE-OFFSET WHICH WILL ESTABLISH OUR CIRCLE SEGMENTS IN THE CORRECT POSITION ON THE CHART
  calculateStrokeDashOffset(percentage: number, circumference: number): number {
    const strokeDifference = percentage * circumference;
    return circumference - strokeDifference;
  }

  calculateChartData() {
    const degreesArray: number[] = [];
    const textCoordinates: any[] = [];
    let textX: number;
    let textY: number;

    this.budgetsPercentList.forEach((dataVal: BudgetsPercentListDto) => {
      const {x, y} = this.calculateTextCoordinates(dataVal, this.angleOffset);
      textX = x;
      textY = y;
      degreesArray.push(this.angleOffset);
      textCoordinates.push({textX, textY});

      // ALL OF SEGMENTS BY DEFAULT BEGIN AT 3 O’CLOCK. TO GET THEM IN THE RIGHT PLACE, WE NEED TO ROTATE EACH SEGMENT TO ITS CORRECT POSITION.
      // WE CAN DO THIS BY FINDING EACH SEGMENT’S RATIO OUT OF 360 DEGREES AND THAN OFFSET THAT AMOUNT BY THE TOTAL DEGREES THAT CAME BEFORE IT
      this.angleOffset = dataVal.percentage * 360 + this.angleOffset;
    });

    this.budgetsPercentList = this.budgetsPercentList.map((values, i) => {
      return {
        ...values,
        degrees: degreesArray[i],
        textX: textCoordinates[i].textX,
        textY: textCoordinates[i].textY
      };
    });
  }

  // TO ROTATE THESE SEGMENTS WE USE SVG TRANSFORM PROPERTY WITH ROTATE FUNCTION
  returnCircleTransformValue(index): string {
    return `rotate(${this.budgetsPercentList[index].degrees}, ${this.cx}, ${this.cy})`;
  }

  // WE ARE WORKING IN DEGREES, SO WE NEED CONVERSION TO RADIANS
  degreesToRadians(angle): number {
    return angle * (Math.PI / 180);
  }

  // WE CALCULATE ANGLE OF SEGMENT BY MULTIPLYING THE RATIO OF DATA VALUE BY 36,
  // WE WANT HALF OF THIS BECAUSE OUR TEXT LABELS ARE IN THE MIDDLE OF THE SEGMENT,
  // WE NEED TO ADD ANGLE OFFSET LIKE WE DID WHEN WE CREATED SEGMENTS.
  calculateTextCoordinates(dataVal: BudgetsPercentListDto, angleOffset: number) {
    const angle: number = (dataVal.percentage * 360) / 2 + angleOffset;
    const radians: number = this.degreesToRadians(angle);

    return {
      x: (this.radius * Math.cos(radians) + this.cx),
      y: (this.radius * Math.sin(radians) + this.cy)
    };
  }

  getLabelPercentageValue(dataVal: BudgetsPercentListDto) {
    return `${Math.round(dataVal.percentage * 100)}%`;
  }

  // METHOD TO CHECK IF SEGMENT IS NOT TO SMALL FOR A LABEL
  segmentIsBigEnough(dataVal: BudgetsPercentListDto) {
    return Math.round(dataVal.percentage * 100) > 5;
  }
}




