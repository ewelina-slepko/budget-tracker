import {Component, OnInit} from '@angular/core';
import {InitialSettingsService} from '../../cards/initial-settings/initial-settings.service';
import {basicAnimation} from '../../../shared/animation';
import {NgForm} from '@angular/forms';
import {categories, CategoryDto, cyclesDict, CyclesDto} from './dtos';

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

  constructor(private initialSettingsService: InitialSettingsService) {
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

  addBudget() {
    this.isNewBudgetCardVisible = true;
  }

  saveBudget(form: NgForm) {
    if (form.form.status === 'VALID') {
      console.log('form >>', form.form.value, 'cycle >>', this.selectedCycle, 'category', this.selectedCategory);
    }
    this.isNewBudgetCardVisible = false;
  }
}
