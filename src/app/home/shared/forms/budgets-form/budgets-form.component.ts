import {Component, OnInit} from '@angular/core';
import {InitialSettingsService} from '../../../initial-settings/initial-settings.service';
import {basicAnimation} from '../../../../shared/animation';
import {NgForm} from '@angular/forms';
import {BudgetDto, categories, CategoryDto, cyclesDict, CyclesDto} from './dtos';
import {Router} from '@angular/router';
import {ApiService} from '../../../../shared/services/api.service';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';

registerLocaleData(localePl, 'pl');

@Component({
  selector: 'budgets-form',
  templateUrl: './budgets-form.component.html',
  styleUrls: ['./budgets-form.component.scss'],
  animations: basicAnimation
})
export class BudgetsFormComponent implements OnInit {

  isNewBudgetCardVisible = false;

  budget = {} as BudgetDto;
  budgetsList: BudgetDto[] = [];

  categories: CategoryDto[] = categories;
  cycles: CyclesDto[] = cyclesDict;

  selectedCycle: string;
  selectedCategory: string;
  repeatCycle = true;

  constructor(private initialSettingsService: InitialSettingsService,
              private authService: AuthenticationService,
              private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit() {
    this.sendCurrentStepInfo();
  }

  sendCurrentStepInfo() {
    this.initialSettingsService.sendCurrentStepInfo(3);
  }

  selectCycle(cycle: CyclesDto) {
    this.cycles.forEach(element => element.isSelected = false);
    this.selectedCycle = cycle.name;
    cycle.isSelected = true;
  }

  selectCategory(category: CategoryDto) {
    this.categories.forEach(element => element.isSelected = false);
    this.selectedCategory = category.name;
    category.isSelected = true;
  }

  isRepeatCycleFieldSelect() {
    this.repeatCycle = !this.repeatCycle;
  }

  addBudget() {
    this.isNewBudgetCardVisible = true;
  }

  removeBudget(budget) {
    this.budgetsList.splice(budget, 1);
  }

  saveBudget(form: NgForm) {
    if (form.form.status === 'VALID') {

      this.budget = form.form.value;
      this.budget.amount = +form.form.value.amount;
      this.budget.cycle = this.selectedCycle;
      this.budget.category = this.selectedCategory;
      this.budget.repeatCycle = this.repeatCycle;
      this.budget.uid = this.authService.currentUser.uid;

      this.budgetsList.push(this.budget);
      console.log(this.budgetsList);
    }
    this.isNewBudgetCardVisible = false;
  }

  saveAllBudgets() {
    this.budgetsList.forEach(budget => this.apiService.addBudget(budget).then((res) => this.router.navigate(['/dashboard'])));
  }

  skipInitialSettings() {
    this.router.navigate(['/dashboard']);
  }
}
