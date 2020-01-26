import {Component, OnInit} from '@angular/core';
import {SignIn} from './dtos';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signIn: SignIn = {} as SignIn;

  constructor() {
  }

  ngOnInit() {
  }

  submit(form) {
    console.log('form >>', form);
    console.log('submitted >>', this.signIn);
  }

}
