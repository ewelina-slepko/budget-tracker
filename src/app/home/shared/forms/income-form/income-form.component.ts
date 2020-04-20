import {Component, OnInit} from '@angular/core';
import {daysAnimation} from './days-animation';
import {InitialSettingsService} from '../../../initial-settings/initial-settings.service';
import {basicAnimation} from '../../../../shared/animation';
import {NgForm} from '@angular/forms';
import {IncomeDaysDto, IncomeFormDto} from './dtos';
import {Router} from '@angular/router';

@Component({
  selector: 'income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
  animations: [daysAnimation, basicAnimation]
})
export class IncomeFormComponent implements OnInit {

  incomeNumber = 1;
  incomeDaysArray: IncomeDaysDto[] = [];

  constructor(private initialSettingsService: InitialSettingsService,
              private router: Router) {
  }

  ngOnInit() {
    this.addIncomeDay();
    this.sendCurrentStepInfo();
  }

  sendCurrentStepInfo() {
    this.initialSettingsService.sendCurrentStepInfo(2);
  }

  addIncomeDay() {
    this.incomeDaysArray.push({
      active: 10,
      isSwipingUp: false,
      isSwipingDown: true
    });
  }

  addIncome() {
    this.incomeNumber += 1;
    this.addIncomeDay();
  }

  saveIncomes(form: NgForm) {
    const incomes = Object.values(form.form.value).map((element: IncomeFormDto, i) => (
      {
        name: element.name,
        amount: element.amount,
        incomeDay: this.incomeDaysArray[i].active
      }
    ));
    this.router.navigate(['/initialsettings/step3']);
  }
}
