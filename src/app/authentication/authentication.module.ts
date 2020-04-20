import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AuthenticationComponent} from './authentication.component';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {FormsModule} from '@angular/forms';
import {DirectivesModule} from '../shared/directives/directives.module';
import {TextInputModule} from '../shared/components/text-input/text-input.module';
import {PasswordPatternDirective} from './validation/password-pattern.directive';
import {NamePatternDirective} from './validation/name-pattern.directive';
import { ValidationMsgComponent } from './validation/validation-msg/validation-msg.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    AuthenticationComponent,
    NamePatternDirective,
    PasswordPatternDirective,
    ValidationMsgComponent],
  exports: [
    ValidationMsgComponent
  ],
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
