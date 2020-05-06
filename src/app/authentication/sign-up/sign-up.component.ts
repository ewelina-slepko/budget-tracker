import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {NgForm} from '@angular/forms';
import {basicAnimation} from '../../shared/animation';
import {Router} from '@angular/router';

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
    this.authService.signUpWithEmailAndPassword(form.form.value)
      .then(() => {
        this.router.navigate(['/initialsettings/step1']);
      });
  }
}
