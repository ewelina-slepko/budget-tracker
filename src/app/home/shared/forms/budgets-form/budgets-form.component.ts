import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InitialSettingsService} from '../../../initial-settings/initial-settings.service';
import {basicAnimation} from '../../../../shared/animation';
import {NgForm} from '@angular/forms';
import {BudgetDto, categories, CategoryDto, cyclesDict, CyclesDto} from './dtos';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {ApiService} from '../../../../shared/services/api.service';

@Component({
  selector: 'budgets-form',
  templateUrl: './budgets-form.component.html',
  styleUrls: ['./budgets-form.component.scss'],
  animations: basicAnimation
})
export class BudgetsFormComponent implements OnInit {

  @Input() budgetsList: BudgetDto[];
  @Input() isNewBudgetCardVisible: boolean;
  @Input() insideBudgetCard = false;

  @Output() closeNewBudgetCardEmitter = new EventEmitter();

  budget = {} as BudgetDto;
  categories: CategoryDto[] = categories;
  cycles: CyclesDto[] = cyclesDict;

  selectedCycle: string;
  selectedCategory: string;
  repeatCycle = true;

  constructor(private initialSettingsService: InitialSettingsService,
              private apiService: ApiService,
              private authService: AuthenticationService) {
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

  saveBudget(form: NgForm) {
    if (form.form.status === 'VALID') {
      this.budget = form.form.value;
      this.budget.amount = +form.form.value.amount;
      this.budget.cycle = this.selectedCycle;
      this.budget.category = this.selectedCategory;
      this.budget.repeatCycle = this.repeatCycle;
      this.budget.uid = this.authService.currentUser.uid;
      this.apiService.addBudget(this.budget);
      
      this.closeNewBudgetCardEmitter.emit();
    }
  }

  closeNewBudgetCard() {
    this.closeNewBudgetCardEmitter.emit();
  }

  get customCategoryIndex() {
    return categories.length - 1;
  }
}
