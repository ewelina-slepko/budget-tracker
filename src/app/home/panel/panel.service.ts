import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Filter} from './cards/transactions/filter-form/dtos';
import {BudgetDto} from '../shared/forms/budgets-form/dtos';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private formStatus = new Subject<boolean>();
  private newTransactionInfo = new Subject();
  private transactionsListFilters = new Subject<Filter[]>();
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

  sendTransactionsListFilters(filters: Filter[]) {
    this.transactionsListFilters.next(filters);
  }

  getTransactionsListFilters(): Observable<Filter[]> {
    return this.transactionsListFilters.asObservable();
  }

  sendBudgetsTransactionsListFilters(budgets: BudgetDto[]) {
    this.budgetsFilters.next(budgets);
  }

  getBudgetsTransactionsListFilters(): Observable<BudgetDto[]> {
    return this.budgetsFilters.asObservable();
  }
}
