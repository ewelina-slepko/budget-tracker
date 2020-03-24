import {Component, OnInit} from '@angular/core';
import {daysAnimation} from './days-animation';

@Component({
  selector: 'income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
  animations: daysAnimation
})
export class IncomeFormComponent implements OnInit {

  incomeNumber = 1;

  daysOfMonth = Array(31).fill(0).map((_, i) => i + 1);
  lastDayOfMonth = this.daysOfMonth[this.daysOfMonth.length - 1];

  activeDay: number;
  previous: number;
  next: number;

  isSwipingUp = false;
  isSwipingDown = true;

  ngOnInit(): void {
    this.activeDay = 10;
    this.setPreviousAndNextValue();
  }

  toggleActiveOnSwipeUp() {
    this.isSwipingUp = true;
    this.isSwipingDown = false;

    this.activeDay = this.activeDay < this.lastDayOfMonth ? this.activeDay + 1 : 1;
    this.setPreviousAndNextValue();
  }

  toggleActiveOnSwipeDown() {
    this.isSwipingDown = true;
    this.isSwipingUp = false;

    this.activeDay = this.activeDay > 1 ? this.activeDay - 1 : this.lastDayOfMonth;
    this.setPreviousAndNextValue();
  }

  setPreviousAndNextValue() {
    this.previous = this.activeDay !== 1 ? this.activeDay - 1 : this.lastDayOfMonth;
    this.next = this.activeDay !== this.lastDayOfMonth ? this.activeDay + 1 : 1;
  }

  addIncome() {
    this.incomeNumber += 1;
  }

  saveIncomes(form) {
    console.log(form, this.activeDay);
  }
}
