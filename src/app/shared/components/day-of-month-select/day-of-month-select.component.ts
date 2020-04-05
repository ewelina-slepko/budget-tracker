import {Component, Input, OnInit} from '@angular/core';
import {daysAnimation} from '../../../home/layouts/income-form/days-animation';

interface IncomeDaysDto {
  active: number;
  previous: number;
  next: number;
  isSwipingUp: boolean;
  isSwipingDown: boolean;
}

@Component({
  selector: 'day-of-month-select',
  templateUrl: './day-of-month-select.component.html',
  styleUrls: ['./day-of-month-select.component.scss'],
  animations: [daysAnimation]
})
export class DayOfMonthSelectComponent implements OnInit {

  @Input() incomeDays: IncomeDaysDto[];
  @Input() i: number;

  daysOfMonth = Array(31).fill(0).map((_, i) => i + 1);
  lastDayOfMonth = this.daysOfMonth[this.daysOfMonth.length - 1];

  constructor() {
  }

  ngOnInit(): void {
    this.setPreviousAndNextValue(0);
  }

  toggleActiveOnSwipeUp(i) {
    this.incomeDays[i].isSwipingUp = true;
    this.incomeDays[i].isSwipingDown = false;

    this.increaseIncomeDayValue(i);
    this.setPreviousAndNextValue(i);
  }

  toggleActiveOnSwipeDown(i) {
    this.incomeDays[i].isSwipingDown = true;
    this.incomeDays[i].isSwipingUp = false;

    this.decreaseIncomeDayValue(i);
    this.setPreviousAndNextValue(i);
  }

  increaseIncomeDayValue(i) {
    this.incomeDays[i].active = this.incomeDays[i].active < this.lastDayOfMonth ? this.incomeDays[i].active + 1 : 1;
  }

  decreaseIncomeDayValue(i) {
    this.incomeDays[i].active = this.incomeDays[i].active > 1 ? this.incomeDays[i].active - 1 : this.lastDayOfMonth;
  }

  setPreviousAndNextValue(i) {
    this.incomeDays[i].previous = this.incomeDays[i].active !== 1 ? this.incomeDays[i].active - 1 : this.lastDayOfMonth;
    this.incomeDays[i].next = this.incomeDays[i].active !== this.lastDayOfMonth ? this.incomeDays[i].active + 1 : 1;
  }
}
