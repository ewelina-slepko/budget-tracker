import {Component, Input} from '@angular/core';
import {BudgetDto} from '../../../../shared/forms/budgets-form/dtos';

@Component({
  selector: 'budgets-list-element',
  templateUrl: './budgets-list-element.component.html',
  styleUrls: ['./budgets-list-element.component.scss']
})
export class BudgetsListElementComponent {

  @Input() budget: BudgetDto;
  @Input() budgetIndex: number;
  @Input() budgetsList: BudgetDto[];

  removeBudget(budget) {
    this.budgetsList.splice(budget, 1);
  }
}
