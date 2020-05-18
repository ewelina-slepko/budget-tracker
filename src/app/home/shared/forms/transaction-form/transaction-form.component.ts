import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {PanelService} from '../../../panel/panel.service';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../../../shared/services/api.service';
import {categories, BudgetDto, CategoryDto} from '../budgets-form/dtos';

@Component({
  selector: 'transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  animations: basicAnimation
})
export class TransactionFormComponent implements OnInit {

  budgetsList: BudgetDto[];
  categories: CategoryDto[] = categories;

  constructor(private panelService: PanelService,
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

  closeNewTransactionForm() {
    this.panelService.sendNewTransactionFormStatus(false);
  }

  saveTransaction(form: NgForm) {
    console.log('TODO', form);
  }

  getStandardCategoryIcon(budget) {
    return categories.filter(category => category.name === budget.category).map(category => category.icon).join();
  }

  checkIfStandardCategory(budget) {
    return categories.map(category => category.name).includes(budget.category);
  }
}
