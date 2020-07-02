import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private transactionFormSubject = new Subject<boolean>();
  private newTransactionInfo = new Subject();

  sendNewTransactionFormStatus(isOpen: boolean) {
    this.transactionFormSubject.next(isOpen);
  }

  getTransactionFormStatus(): Observable<boolean> {
    return this.transactionFormSubject.asObservable();
  }

  sendNewTransactionInfo() {
    return this.newTransactionInfo.next();
  }

  getNewTransactionInfo() {
    return this.newTransactionInfo.asObservable();
  }
}
