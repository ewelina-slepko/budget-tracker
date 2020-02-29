import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {isEmailValid, isNameValid, isPasswordValid} from '../utilities';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../authentication.component.scss', './sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  isEmailValid = isEmailValid;
  isPasswordValid = isPasswordValid;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  signInWithEmailAndPassword(form: NgForm) {
    console.log(form.value);
    this.authService.signInWithEmailAndPassword(form.form.value.Email, form.form.value.Password);
  }
}
