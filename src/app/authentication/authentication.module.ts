import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AuthenticationComponent} from './authentication.component';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {FormsModule} from '@angular/forms';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {DirectivesModule} from '../shared/directives/directives.module';
import {TextInputModule} from '../shared/components/text-input/text-input.module';
import { ValidationComponent } from './validation/validation.component';


@NgModule({
  declarations: [SignInComponent, SignUpComponent, ForgotPasswordComponent, AuthenticationComponent, VerifyEmailComponent, ValidationComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    DirectivesModule,
    TextInputModule,
  ]
})
export class AuthenticationModule {
}
