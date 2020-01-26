import {Component, OnInit} from '@angular/core';
import {User} from './dtos';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user: User = {} as User;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  submit(user) {
    this.authService.SignIn(user.email, user.password);
    console.log('submitted >>', this.user);
  }

  logInWithGoogle() {
    this.authService.GoogleAuth();
  }

}
