import {Component, OnInit} from '@angular/core';
import {daysAnimation} from './days-animation';
import {InitialSettingsService} from '../../cards/initial-settings/initial-settings.service';
import {Router} from '@angular/router';

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

  constructor(private initialSettingsService: InitialSettingsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activeDay = 10;
    this.sendCurrentStepInfo();
    this.setPreviousAndNextValue();
  }

  sendCurrentStepInfo() {
    this.initialSettingsService.sendCurrentStepInfo(2);
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
    this.router.navigate(['/user/initialsettings/step3']);
  }
}
