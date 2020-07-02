import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {PanelService} from '../../../panel/panel.service';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../../../shared/services/api.service';
import {categories, BudgetDto} from '../budgets-form/dtos';
import {NewTransactionRequest} from './dtos';
import {AuthenticationService} from '../../../../authentication/authentication.service';

@Component({
  selector: 'transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  animations: basicAnimation
})
export class TransactionFormComponent implements OnInit {

  budgetsList: BudgetDto[];
  selectedBudgetId: string;

  transaction = {} as NewTransactionRequest;

  constructor(private panelService: PanelService,
              private apiService: ApiService,
              private authService: AuthenticationService) {
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

  getStandardCategoryIcon(budget) {
    return categories.filter(category => category.name === budget.category).map(category => category.icon).join();
  }

  checkIfStandardCategory(budget) {
    return categories.map(category => category.name).includes(budget.category);
  }

  selectBudget(budget) {
    this.selectedBudgetId = budget.id;
  }

  saveTransaction(form: NgForm) {
    if (form.form.status !== 'VALID') {
      return;
    }
    this.transaction.name = form.form.value.name;
    this.transaction.amount = +form.form.value.amount;
    this.transaction.date = form.form.value.date;
    this.transaction.budgetId = this.selectedBudgetId;
    this.transaction.uid = this.authService.currentUser.uid;

    this.apiService.addTransaction(this.transaction).then(() => {
      this.closeNewTransactionForm();
      this.panelService.sendNewTransactionInfo();
    });
  }
}
