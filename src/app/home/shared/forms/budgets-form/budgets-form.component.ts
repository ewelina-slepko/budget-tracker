import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InitialSettingsService} from '../../../initial-settings/initial-settings.service';
import {NgForm} from '@angular/forms';
import {categories, CategoryDto, NewBudgetRequest} from './dtos';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {ApiService} from '../../../../shared/services/api.service';
import {formAnimation} from '../../../../shared/animations/form-animation';

@Component({
  selector: 'budgets-form',
  templateUrl: './budgets-form.component.html',
  styleUrls: ['./budgets-form.component.scss'],
  animations: formAnimation
})
export class BudgetsFormComponent implements OnInit {

  @Input() isNewBudgetFormOpen: boolean;
  @Output() closeNewBudgetFormEmitter = new EventEmitter();

  budget = {} as NewBudgetRequest;
  categories: CategoryDto[] = categories;
  selectedCategory: string;

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

  selectCategory(category: CategoryDto) {
    this.categories.forEach(element => element.isSelected = false);
    this.selectedCategory = category.name;
    category.isSelected = true;
  }

  saveBudget(form: NgForm) {
    if (form.form.status === 'VALID') {

      this.budget = form.form.value;
      this.budget.amount = +form.form.value.amount;
      this.budget.category = this.selectedCategory;
      this.budget.uid = this.authService.currentUser.uid;

      this.apiService.addBudget(this.budget).then(() => {
        this.closeNewBudgetCard();
        this.clearAllFields();
      });

    }
  }

  closeNewBudgetCard() {
    this.closeNewBudgetFormEmitter.emit();
  }

  clearAllFields() {
    this.categories.forEach(category => category.isSelected = false);
  }

  get customCategoryIndex() {
    return categories.length - 1;
  }
}
