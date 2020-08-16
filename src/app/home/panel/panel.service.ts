import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {StandardFilter} from './cards/transactions/filter-form/dtos';
import {BudgetDto} from '../shared/forms/budgets-form/dtos';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private formStatus = new Subject<boolean>();
  private newTransactionInfo = new Subject();
  private transactionsListFilters = new Subject<StandardFilter[]>();
  private budgetsFilters = new Subject<BudgetDto[]>();

  sendFormStatus(isOpen: boolean) {
    this.formStatus.next(isOpen);
  }

  getFormStatus(): Observable<boolean> {
    return this.formStatus.asObservable();
  }

  sendNewTransactionInfo() {
    return this.newTransactionInfo.next();
  }

  getNewTransactionInfo() {
    return this.newTransactionInfo.asObservable();
  }

  sendStandardTransactionsListFilters(filters: StandardFilter[]) {
    this.transactionsListFilters.next(filters);
  }

  getStandardTransactionsListFilters(): Observable<StandardFilter[]> {
    return this.transactionsListFilters.asObservable();
  }

  sendBudgetsTransactionsListFilters(budgets: BudgetDto[]) {
    this.budgetsFilters.next(budgets);
  }

  getBudgetsTransactionsListFilters(): Observable<BudgetDto[]> {
    return this.budgetsFilters.asObservable();
  }
}
