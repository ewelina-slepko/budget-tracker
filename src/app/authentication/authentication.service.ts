import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NotifierService} from '../shared/components/notifier/notifier.service';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private notifierService: NotifierService) {
  }

  signUpWithEmailAndPassword(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).catch((error) => {
      if (error) {
        this.notifierService.notify(
          error.message,
          2,
        );
      }
    });
  }

  signInWithEmailAndPassword(email, password): Promise<firebase.auth.UserCredential | void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        this.notifierService.notify('There is no user record corresponding to this identifier.', 2);
      });
  }

  signOut() {
    this.afAuth.signOut().then(res => console.log(res));
  }

  isAuthenticated() {
    return this.afAuth.authState;
  }
}