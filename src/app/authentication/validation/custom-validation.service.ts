import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }

  passwordValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
}
