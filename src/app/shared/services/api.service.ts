import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
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

  addBudget(document) {
    return this.firestore.collection('budgets').add(document);
  }

  getBudgetsList(): Observable<BudgetDto[]> {
    return this.firestore
      .collection<BudgetDto>('budgets', ref => ref.where('uid', '==', this.authService.currentUser.uid))
      .valueChanges();
  }
}
