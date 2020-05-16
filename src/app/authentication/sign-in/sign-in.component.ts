import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import UserCredential = firebase.auth.UserCredential;
import {basicAnimation} from '../../shared/animations/basic-animation';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../authentication.component.scss', './sign-in.component.scss'],
  animations: basicAnimation
})
export class SignInComponent {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  signInWithEmailAndPassword(form: NgForm) {
    if (form.status === 'VALID') {
      this.authService.signInWithEmailAndPassword(form.form.value.email, form.form.value.password)
        .then((res: UserCredential) => {
            if (res?.user) {
              this.router.navigate(['/dashboard']);
            }
          }
        );
    }
  }
}
