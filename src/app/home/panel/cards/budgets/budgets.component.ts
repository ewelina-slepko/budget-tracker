import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {BudgetDto} from '../../../shared/forms/budgets-form/dtos';
import {ApiService} from '../../../../shared/services/api.service';
import {saveDocumentWithId} from '../../../../shared/utilities';

@Component({
  selector: 'budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
  animations: basicAnimation
})
export class BudgetsComponent implements OnInit {

  budgetsList: BudgetDto[];
  isNewBudgetFormOpen = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getBudgetsList();
  }

  getBudgetsList() {
    this.apiService.getBudgetsList().subscribe(res => this.budgetsList = saveDocumentWithId(res));
  }
}
