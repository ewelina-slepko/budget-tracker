import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import {firebaseConfig} from '../../../firebase-config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  signUpWithEmailAndPassword(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => console.log(error)).then(res =>
      console.log(res)
    );
  }

  signInWithEmailAndPassword(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => console.log(error)).then(res => console.log(res));
  }
}
