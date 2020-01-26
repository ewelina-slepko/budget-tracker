import {Component, OnInit} from '@angular/core';
import {NewUser} from './dtos';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  newUser: NewUser = {} as NewUser;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  submit(newUser) {
    this.authService.SignUp(newUser.email, newUser.password);
    console.log('submitted >>', this.newUser);
  }

  SignUpWithGoogle() {
    this.authService.GoogleAuth();
  }

}
