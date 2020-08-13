import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {TransactionsListFiltersDto} from './cards/transactions/filter-form/dtos';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private formStatus = new Subject<boolean>();
  private newTransactionInfo = new Subject();
  private transactionsListFilters = new Subject<TransactionsListFiltersDto>();

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

  sendTransactionsListFilters(filters: TransactionsListFiltersDto) {
    this.transactionsListFilters.next(filters);
  }

  getTransactionsListFilters(): Observable<TransactionsListFiltersDto> {
    return this.transactionsListFilters.asObservable();
  }
}
