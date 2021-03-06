import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../shared/animations/basic-animation';
import {BudgetDto} from '../../shared/forms/budgets-form/dtos';
import {Router} from '@angular/router';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'budgets-initial-settings',
  templateUrl: './budgets-initial-settings.component.html',
  styleUrls: ['./budgets-initial-settings.component.scss'],
  animations: basicAnimation
})
export class BudgetsInitialSettingsComponent implements OnInit {

  budgetsList: BudgetDto[] = [];
  isNewBudgetFormOpen = false;

  constructor(private router: Router,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.getBudgetsList();
  }

  getBudgetsList() {
    this.apiService.getBudgetsList().subscribe(res => {
      this.budgetsList = res.map(budget => {
        const budgetData = budget.payload.doc.data();
        const id = budget.payload.doc.id;
        return {id, ...budgetData};
      });
    });
  }

  addBudget() {
    this.isNewBudgetFormOpen = true;
  }

  goToDashboard() {
    if (this.budgetsList?.length > 0) {
      this.router.navigate(['/dashboard']);
    }
  }

  skipInitialSettings() {
    this.router.navigate(['/dashboard']);
  }
}
