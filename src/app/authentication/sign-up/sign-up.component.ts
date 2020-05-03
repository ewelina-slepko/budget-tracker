import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {NgForm} from '@angular/forms';
import {basicAnimation} from '../../shared/animation';
import {Router} from '@angular/router';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../authentication.component.scss', './sign-up.component.scss'],
  animations: basicAnimation
})
export class SignUpComponent {

  constructor(public authService: AuthenticationService,
              private router: Router) {
  }

  signUpWithEmailAndPassword(form: NgForm) {
    this.authService.signUpWithEmailAndPassword(form.form.value.email, form.form.value.password, form.form.value.name)
      .then(() => {
        this.router.navigate(['/initialsettings/step1']);
      });
  }
}
