import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private formStatus = new Subject<boolean>();
  private newTransactionInfo = new Subject();

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
}
