import {Component} from '@angular/core';
import {basicAnimation} from '../../../shared/animation';
import {BudgetDto} from '../../shared/forms/budgets-form/dtos';
import {ApiService} from '../../../shared/services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'budgets-initial-settings',
  templateUrl: './budgets-initial-settings.component.html',
  styleUrls: ['./budgets-initial-settings.component.scss'],
  animations: basicAnimation
})
export class BudgetsInitialSettingsComponent {

  budgetsList: BudgetDto[] = [];
  isNewBudgetCardVisible = false;

  constructor(private apiService: ApiService,
              private router: Router) {
  }

  addBudget() {
    this.isNewBudgetCardVisible = true;
  }

  saveAllBudgets() {
    this.budgetsList.forEach(budget => this.apiService.addBudget(budget).then(() => this.router.navigate(['/dashboard'])));
  }

  skipInitialSettings() {
    this.router.navigate(['/dashboard']);
  }
}
