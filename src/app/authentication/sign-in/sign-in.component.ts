import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../authentication.component.scss', './sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  signInWithEmailAndPassword(form: NgForm) {
    console.log(form.value);
    if (form.status === 'VALID') {
      this.authService.signInWithEmailAndPassword(form.form.value.Email, form.form.value.Password);
    }
  }
}
