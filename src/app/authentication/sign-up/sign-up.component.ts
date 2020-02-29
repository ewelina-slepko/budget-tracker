import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {isEmailValid, isNameValid, isPasswordValid} from '../utilities';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../authentication.component.scss', './sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isNameValid = isNameValid;
  isEmailValid = isEmailValid;
  isPasswordValid = isPasswordValid;

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  signUpWithEmailAndPassword(form: NgForm) {
    this.authService.signUpWithEmailAndPassword(form.form.value.Email, form.form.value.Password);
  }
}
