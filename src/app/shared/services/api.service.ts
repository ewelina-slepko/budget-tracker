import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthenticationService} from '../../authentication/authentication.service';
import {WalletDto} from '../../home/shared/forms/wallet-form/dtos';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthenticationService) {
  }

  addSourceToWalletList(document) {
    return this.firestore.collection('wallet').add(document);
  }

  getWalletList(): Observable<WalletDto[]> {
    return this.firestore
      .collection<WalletDto>('wallet', ref => ref.where('uid', '==', this.authService.currentUser.uid))
      .valueChanges();
  }
}
