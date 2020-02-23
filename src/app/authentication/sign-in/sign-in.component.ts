import {Component, OnInit} from '@angular/core';
import {User} from './dtos';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../authentication.component.scss', './sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user: User = {} as User;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  signInWithEmailAndPassword(form: NgForm, user: User) {
    console.log(form.value);
    this.authService.signInWithEmailAndPassword(user.email, user.password);
  }
}
