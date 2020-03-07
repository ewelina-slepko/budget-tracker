import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../authentication.component.scss', './sign-in.component.scss']
})
export class SignInComponent {

  constructor(private authService: AuthenticationService) {
  }

  signInWithEmailAndPassword(form: NgForm) {
    if (form.status === 'VALID') {
      this.authService.signInWithEmailAndPassword(form.form.value.Email, form.form.value.Password);
    }
  }
}
