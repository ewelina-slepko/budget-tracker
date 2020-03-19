import {Component, OnChanges, OnInit} from '@angular/core';
import {daysAnimation} from './days-animation';

@Component({
  selector: 'income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
  animations: daysAnimation
})
export class IncomeFormComponent implements OnInit, OnChanges {

  daysOfMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  lastDayOfMonth = this.daysOfMonth[this.daysOfMonth.length - 1];

  active: number;
  previous: number;
  next: number;

  isSwipingUp = false;
  isSwipingDown = true;

  ngOnInit(): void {
    this.active = 10;
    this.setPreviousAndNextValue();
  }

  ngOnChanges() {
    this.previous = this.active - 1;
    this.next = this.active + 1;
  }

  toggleActiveOnSwipeUp() {
    this.isSwipingUp = true;
    this.isSwipingDown = false;

    this.active = this.active < this.lastDayOfMonth ? this.active + 1 : this.active = 1;
    this.setPreviousAndNextValue();
  }

  toggleActiveOnSwipeDown() {
    this.isSwipingDown = true;
    this.isSwipingUp = false;

    this.active = this.active > 1 ? this.active - 1 : this.lastDayOfMonth;
    this.setPreviousAndNextValue();
  }

  setPreviousAndNextValue() {
    this.previous = this.active !== 1 ? this.active - 1 : this.lastDayOfMonth;
    this.next = this.active !== this.lastDayOfMonth ? this.active + 1 : 1;
  }

}
