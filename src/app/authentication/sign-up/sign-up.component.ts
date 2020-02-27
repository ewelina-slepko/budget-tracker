import {Component, OnInit} from '@angular/core';
import {NewUser} from './dtos';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../authentication.component.scss', './sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  newUser: NewUser = {} as NewUser;

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit() {

  }

  signUpWithEmailAndPassword(form, newUser: NewUser) {
    console.log(form.value);
    this.authService.signUpWithEmailAndPassword(newUser.email, newUser.password);
  }

  isValidName(field: string) {
    return field.length > 1;
  }

  isValidEmail(field: string) {
    return field.includes('@') && field.includes('.') && field.length > 5;
  }

  isValidPassword(field: string) {
    return field.length > 7;
  }

}
