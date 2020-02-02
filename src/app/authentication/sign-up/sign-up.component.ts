import {Component, OnInit} from '@angular/core';
import {NewUser} from './dtos';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  newUser: NewUser = {} as NewUser;

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  signUpWithEmailAndPassword() {
    this.authService.signUpWithEmailAndPassword(this.newUser.email, this.newUser.password);
  }

}
