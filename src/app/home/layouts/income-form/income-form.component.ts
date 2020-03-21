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
  incomes = [];

  daysOfMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  lastDayOfMonth = this.daysOfMonth[this.daysOfMonth.length - 1];

  activeDay: number;
  previous: number;
  next: number;

  isSwipingUp = false;
  isSwipingDown = true;

  ngOnInit(): void {
    this.incomes.push(this.incomeNumber);
    this.activeDay = 10;
    this.setPreviousAndNextValue();
  }

  toggleActiveOnSwipeUp() {
    this.isSwipingUp = true;
    this.isSwipingDown = false;

    this.activeDay = this.activeDay < this.lastDayOfMonth ? this.activeDay + 1 : this.activeDay = 1;
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
    this.incomes.push(++this.incomeNumber);
  }

  saveIncomes(form) {
    console.log(form.value, this.activeDay);
  }

}
