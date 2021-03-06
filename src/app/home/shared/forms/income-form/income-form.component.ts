import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {daysAnimation} from './days-animation';
import {InitialSettingsService} from '../../../initial-settings/initial-settings.service';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {NgForm} from '@angular/forms';
import {IncomeDaysDto, NewIncomeRequest} from './dtos';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {ApiService} from '../../../../shared/services/api.service';

@Component({
  selector: 'income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
  animations: [daysAnimation, basicAnimation]
})
export class IncomeFormComponent implements OnInit {

  @Input() inInitialSettings = true;
  @Output() closeIncomeFormEmitter = new EventEmitter();

  incomeNumber = 1;
  incomeDaysArray: IncomeDaysDto[] = [];

  constructor(private initialSettingsService: InitialSettingsService,
              private authService: AuthenticationService,
              private apiService: ApiService,
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
    if (form.form.status !== 'VALID') {
      return;
    }
    Object.values(form.form.value)
      .map(({amount, ...rest}, i) => (
        {
          incomeDay: this.incomeDaysArray[i].active,
          uid: this.authService.currentUser.uid,
          amount: +amount,
          ...rest,
        }
      ))
      .forEach((income: NewIncomeRequest) => this.apiService.addIncome(income)
        .then(() => {
          if (this.inInitialSettings) {
            return this.router.navigate(['/initialsettings/step3']);
          }
          this.closeIncomeFormEmitter.emit();
        }));
  }

  skipInitialSettings() {
    this.router.navigate(['/dashboard']);
  }
}
