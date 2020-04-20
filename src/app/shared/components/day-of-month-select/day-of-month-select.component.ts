import {Component, Input} from '@angular/core';
import {daysAnimation} from '../../../home/shared/forms/income-form/days-animation';
import {IncomeDaysDto} from '../../../home/shared/forms/income-form/dtos';

@Component({
  selector: 'day-of-month-select',
  templateUrl: './day-of-month-select.component.html',
  styleUrls: ['./day-of-month-select.component.scss'],
  animations: [daysAnimation]
})
export class DayOfMonthSelectComponent {

  @Input() incomeDay: IncomeDaysDto;

  daysOfMonth = Array(31).fill(0).map((_, i) => i + 1);
  lastDayOfMonth = this.daysOfMonth[this.daysOfMonth.length - 1];

  toggleActiveOnSwipeUp() {
    this.incomeDay.isSwipingUp = true;
    this.incomeDay.isSwipingDown = false;

    this.increaseIncomeDayValue();
  }

  toggleActiveOnSwipeDown() {
    this.incomeDay.isSwipingDown = true;
    this.incomeDay.isSwipingUp = false;

    this.decreaseIncomeDayValue();
  }

  increaseIncomeDayValue() {
    this.incomeDay.active = this.incomeDay.active < this.lastDayOfMonth ? this.incomeDay.active + 1 : 1;
  }

  decreaseIncomeDayValue() {
    this.incomeDay.active = this.incomeDay.active > 1 ? this.incomeDay.active - 1 : this.lastDayOfMonth;
  }
}
