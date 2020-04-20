import {Component, OnInit} from '@angular/core';
import {InitialSettingsService} from '../../../initial-settings/initial-settings.service';
import {basicAnimation} from '../../../../shared/animation';
import {NgForm} from '@angular/forms';
import {categories, CategoryDto, cyclesDict, CyclesDto} from './dtos';
import {Router} from '@angular/router';

@Component({
  selector: 'budgets-form',
  templateUrl: './budgets-form.component.html',
  styleUrls: ['./budgets-form.component.scss'],
  animations: basicAnimation
})
export class BudgetsFormComponent implements OnInit {

  isNewBudgetCardVisible = false;

  categories: CategoryDto[] = categories;
  cycles: CyclesDto[] = cyclesDict;

  selectedCycle: string;
  selectedCategory: string;
  repeatCycle = true;

  constructor(private initialSettingsService: InitialSettingsService,
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


  saveBudget(form: NgForm) {
    if (form.form.status === 'VALID') {
      console.log('form >>', form.form.value, 'cycle >>', this.selectedCycle, 'category', this.selectedCategory);
    }
    this.isNewBudgetCardVisible = false;
  }

  saveAllBudgets() {
    this.router.navigate(['/dashboard']);
  }
}
