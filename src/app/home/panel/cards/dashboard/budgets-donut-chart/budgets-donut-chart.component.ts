import {Component, Input, OnInit} from '@angular/core';
import {saveDocumentWithId} from '../../../../../shared/utilities';
import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';
import {ApiService} from '../../../../../shared/services/api.service';
import {BudgetDto} from '../../../../shared/forms/budgets-form/dtos';
import {BudgetsPercentListDto, DonutColors} from '../dtos';
import {PanelService} from '../../../panel.service';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'budgets-donut-chart',
  templateUrl: './budgets-donut-chart.component.html',
  styleUrls: ['./budgets-donut-chart.component.scss']
})
export class BudgetsDonutChartComponent implements OnInit {

  @Input() transactionsList: TransactionDto[];
  budgetsList: BudgetDto[];
  currentMonthBudgetsPercentList: BudgetsPercentListDto[];

  // BASIC CHART PROPERTIES
  cx = 80;
  cy = 80;
  radius = 60;
  width = 30;
  angleOffset = -90;
  donutColors: string[] = DonutColors;

  constructor(private apiService: ApiService,
              private panelService: PanelService,
              private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getAndCalculateBudgetsPercentageInMonth();
    this.listenOnNewTransactionInfo();
  }

  listenOnNewTransactionInfo() {
    this.panelService.getNewTransactionInfo().subscribe(() => {
      this.getAndCalculateBudgetsPercentageInMonth();
    });
  }

  getAndCalculateBudgetsPercentageInMonth() {
    this.apiService.getBudgetsList().subscribe(res => {
      this.budgetsList = saveDocumentWithId(res);
      this.calculatePercentage();
    });
  }

  calculatePercentage() {
    const currentMonthBudgetsList: BudgetDto[] = this.transactionsList.getCurrentMonthTransactions().sumDuplicatedBudgetsAmounts();

    const budgetsSum: number = Object.keys(currentMonthBudgetsList).map(key => currentMonthBudgetsList[key]).sum();

    this.currentMonthBudgetsPercentList = Object.keys(currentMonthBudgetsList)
      .map((budgetId: string) => (
        {
          name: this.budgetsList.filter(budget => budget.id === budgetId).map(({name}) => name).toString(),
          percentage: currentMonthBudgetsList[budgetId] / budgetsSum,
          budgetId
        }
      ))
      .sort((a, b) => b.percentage - a.percentage)
      .map((rest, i) => (
        {
          color: i <= this.donutColors.length - 1 ? this.donutColors[i] : `hsl(${Math.floor(Math.random() * 360) + 1}, 75%, 52%)`,
          ...rest
        }
      ));
    this.dashboardService.currentMonthBudgetsPercentList = this.currentMonthBudgetsPercentList;
    this.calculateChartData();
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

    this.currentMonthBudgetsPercentList.forEach((dataVal: BudgetsPercentListDto) => {
      const {x, y} = this.calculateTextCoordinates(dataVal, this.angleOffset);
      textX = x;
      textY = y;
      degreesArray.push(this.angleOffset);
      textCoordinates.push({textX, textY});

      // ALL OF SEGMENTS BY DEFAULT BEGIN AT 3 O’CLOCK. TO GET THEM IN THE RIGHT PLACE, WE NEED TO ROTATE EACH SEGMENT
      // TO ITS CORRECT POSITIONn WE CAN DO THIS BY FINDING EACH SEGMENT’S RATIO OUT OF 360 DEGREES AND THAN OFFSET
      // THAT AMOUNT BY THE TOTAL DEGREES THAT CAME BEFORE IT
      this.angleOffset = dataVal.percentage * 360 + this.angleOffset;
    });

    this.currentMonthBudgetsPercentList = this.currentMonthBudgetsPercentList.map((values, i) => {
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
    return `rotate(${this.currentMonthBudgetsPercentList[index].degrees}, ${this.cx}, ${this.cy})`;
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

  get isBudgetsListEmpty() {
    return this.currentMonthBudgetsPercentList?.length === 0;
  }
}




