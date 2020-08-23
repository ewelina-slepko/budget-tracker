import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NotifierService} from '../shared/components/notifier/notifier.service';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {NotificationType} from '../shared/components/notifier/notifier';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: firebase.User;

  constructor(public auth: AngularFireAuth,
              private router: Router,
              private notifierService: NotifierService) {
  }

  signUpWithEmailAndPassword(form) {
    return this.auth.createUserWithEmailAndPassword(form.email, form.password).then((result) => {
      return result.user.updateProfile({
        displayName: form.name
      });
    }).catch((error) => {
      this.notifierService.notify(
        error.message,
        NotificationType.Fail,
      );
    });
  }

  signInWithEmailAndPassword(email, password): Promise<firebase.auth.UserCredential | void> {
    return this.auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        this.notifierService.notify('There is no user record corresponding to this identifier.', 2);
      });
  }

  logout() {
    this.auth.signOut().then(res => this.router.navigateByUrl('/auth/signin'));
  }

  isAuthenticated() {
    return this.auth.authState;
  }
}
