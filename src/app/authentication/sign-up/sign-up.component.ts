import {Component} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {NgForm} from '@angular/forms';
import {basicAnimation} from '../../shared/animation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../authentication.component.scss', './sign-up.component.scss'],
  animations: basicAnimation
})
export class SignUpComponent {

  constructor(public authService: AuthenticationService) {
  }

  signUpWithEmailAndPassword(form: NgForm) {
    if (form.status === 'VALID') {
      this.authService.signUpWithEmailAndPassword(form.form.value.Email, form.form.value.Password);
    }
  }
}
