import {Component, Input, OnInit} from '@angular/core';
import {BudgetDto} from '../../../../shared/forms/budgets-form/dtos';

@Component({
  selector: 'budget-list-element',
  templateUrl: './budget-list-element.component.html',
  styleUrls: ['./budget-list-element.component.scss']
})
export class BudgetListElementComponent {

  @Input() budget: BudgetDto;
  @Input() budgetIndex: number;
  @Input() budgetList: BudgetDto[];

  removeBudget(budget) {
    this.budgetList.splice(budget, 1);
  }
}
