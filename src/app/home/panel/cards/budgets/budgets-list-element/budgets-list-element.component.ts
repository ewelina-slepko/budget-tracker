import {Component, Input} from '@angular/core';
import {BudgetDto} from '../../../../shared/forms/budgets-form/dtos';
import {ApiService} from '../../../../../shared/services/api.service';

@Component({
  selector: 'budgets-list-element',
  templateUrl: './budgets-list-element.component.html',
  styleUrls: ['./budgets-list-element.component.scss']
})
export class BudgetsListElementComponent {

  @Input() budget: BudgetDto;
  @Input() budgetIndex: number;
  @Input() budgetsList: BudgetDto[];

  constructor(private apiService: ApiService) {

  }

  removeBudget(id) {
    this.apiService.removeBudgetFromList(id);
  }
}
