import {Component, OnInit} from '@angular/core';
import {User} from './dtos';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user: User = {} as User;

  constructor() {
  }

  ngOnInit() {
  }

}
