import {Component, OnInit} from '@angular/core';
import {SignUp} from './dtos';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUp: SignUp = {} as SignUp;

  constructor() {
  }

  ngOnInit() {
  }

  submit(form) {
    console.log('form >>', form);
    console.log('submitted >>', this.signUp);
  }

}
