import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import {firebaseConfig} from '../../../firebase-config';
import {Router} from '@angular/router';
import {NotifierService} from '../components/notifier/notifier.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  provider = new firebase.auth.GoogleAuthProvider();

  constructor(private router: Router,
              private notifierService: NotifierService) {
    firebase.initializeApp(firebaseConfig);
  }

  signUpWithEmailAndPassword(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      if (error) {
        this.notifierService.notify(
          error.message,
          2,
        );
      }
    }).then(res => {
      if (res) {
        this.redirectToDashboard();
        console.log(res);
      }
    });

  }

  signInWithEmailAndPassword(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => console.log(error))
      .then(res => {
        this.redirectToDashboard();
        console.log(res);
      });
  }

  signInWithGoogle() {
    firebase.auth().signInWithRedirect(this.provider).then((res) => {
      console.log(res);
      firebase.auth().getRedirectResult().then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    });

  }

  signOut() {
    firebase.auth().signOut().then(res => console.log(res));
  }

  isAuthenticated(): boolean {
    const currentUser = firebase.auth().currentUser;
    return !!currentUser;
  }

  redirectToDashboard() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return this.router.navigate(['dashboard/home']);
      }
    });
  }
}
