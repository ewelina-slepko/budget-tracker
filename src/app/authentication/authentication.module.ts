import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthenticationComponent } from './authentication.component';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [SignInComponent, SignUpComponent, ForgotPasswordComponent, AuthenticationComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
