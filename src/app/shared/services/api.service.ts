import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {AuthenticationService} from '../../authentication/authentication.service';
import {NewSourceRequest, WalletDto} from '../../home/shared/forms/wallet-form/dtos';
import {Observable} from 'rxjs';
import {IncomeDto, NewIncomeRequest} from '../../home/shared/forms/income-form/dtos';
import {BudgetDto, NewBudgetRequest} from '../../home/shared/forms/budgets-form/dtos';
import {NewTransactionRequest, TransactionDto} from '../../home/shared/forms/transaction-form/dtos';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthenticationService) {
  }

  addWalletSource(document: NewSourceRequest) {
    return this.firestore.collection('wallet').add(document);
  }

  getWalletList(): Observable<WalletDto[]> {
    return this.firestore
      .collection<WalletDto>('wallet', ref => ref.where('uid', '==', this.authService.currentUser.uid))
      .valueChanges();
  }

  addIncome(document: NewIncomeRequest) {
    return this.firestore.collection('incomes').add(document);
  }

  getIncomesList(): Observable<IncomeDto[]> {
    return this.firestore
      .collection<IncomeDto>('incomes', ref => ref.where('uid', '==', this.authService.currentUser.uid))
      .valueChanges();
  }

  addBudget(document: NewBudgetRequest) {
    return this.firestore.collection('budgets').add(document);
  }

  removeBudget(documentId: string) {
    this.firestore.doc('budgets/' + documentId).delete();
  }

  getBudgetsList(): Observable<DocumentChangeAction<BudgetDto>[]> {
    return this.firestore
      .collection<BudgetDto>('budgets', ref => ref.where('uid', '==', this.authService.currentUser.uid))
      .snapshotChanges();
  }

  addTransaction(document: NewTransactionRequest) {
    return this.firestore.collection('transactions').add(document);
  }

  removeTransaction(documentId) {
    this.firestore.doc('transactions/' + documentId).delete();
  }

  getTransactionsList(): Observable<DocumentChangeAction<TransactionDto>[]> {
    return this.firestore
      .collection<TransactionDto>('transactions', ref => ref.where('uid', '==', this.authService.currentUser.uid))
      .snapshotChanges();
  }
}
