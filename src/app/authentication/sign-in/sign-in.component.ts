import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import UserCredential = firebase.auth.UserCredential;
import {basicAnimation} from '../../shared/animation';

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
    console.log(form);
    if (form.status === 'VALID') {
      this.authService.signInWithEmailAndPassword(form.form.value.Email, form.form.value.Password)
        .then((res: UserCredential) => {
            if (res?.user) {
              console.log(res);
              this.router.navigate(['/user/initialsettings/step1']);
            }
          }
        );
    }
  }
}
