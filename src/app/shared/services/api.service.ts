import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {AuthenticationService} from '../../authentication/authentication.service';
import {WalletDto} from '../../home/shared/forms/wallet-form/dtos';
import {Observable} from 'rxjs';
import {IncomeDto} from '../../home/shared/forms/income-form/dtos';
import {BudgetDto} from '../../home/shared/forms/budgets-form/dtos';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthenticationService) {
  }

  addWalletSource(document) {
    return this.firestore.collection('wallet').add(document);
  }

  getWalletList(): Observable<WalletDto[]> {
    return this.firestore
      .collection<WalletDto>('wallet', ref => ref.where('uid', '==', this.authService.currentUser.uid))
      .valueChanges();
  }

  addIncome(document) {
    return this.firestore.collection('incomes').add(document);
  }

  getIncomesList(): Observable<IncomeDto[]> {
    return this.firestore
      .collection<IncomeDto>('incomes', ref => ref.where('uid', '==', this.authService.currentUser.uid))
      .valueChanges();
  }

  addBudget(document: BudgetDto) {
    return this.firestore.collection('budgets').add(document);
  }

  removeBudgetFromList(documentId: string) {
    this.firestore.doc('budgets/' + documentId).delete();
  }

  getBudgetsList(): Observable<DocumentChangeAction<BudgetDto>[]> {
    return this.firestore
      .collection<BudgetDto>('budgets', ref => ref.where('uid', '==', this.authService.currentUser.uid))
      .snapshotChanges();
  }

  addTransaction(document) {
    return this.firestore.collection('transactions').add(document);
  }
}
