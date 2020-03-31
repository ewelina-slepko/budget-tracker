import {Component, OnInit} from '@angular/core';
import {InitialSettingsService} from '../../cards/initial-settings/initial-settings.service';

@Component({
  selector: 'budgets-form',
  templateUrl: './budgets-form.component.html',
  styleUrls: ['./budgets-form.component.scss']
})
export class BudgetsFormComponent implements OnInit {

  isNewBudgetCardVisible = false;
  categories = ['Rent', 'Food', 'Netflix', 'Gym', 'Events', 'Pet', 'Charity'];

  constructor(private initialSettingsService: InitialSettingsService) {
  }

  ngOnInit() {
    this.sendCurrentStepInfo();
  }

  sendCurrentStepInfo() {
    this.initialSettingsService.sendCurrentStepInfo(3);
  }

  addBudget() {
    this.isNewBudgetCardVisible = true;
  }

  saveBudget() {
    this.isNewBudgetCardVisible = false;
  }
}
