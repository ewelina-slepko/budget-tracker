import {Component, OnInit} from '@angular/core';
import {NewUser} from './dtos';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../authentication.component.scss']
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

}
