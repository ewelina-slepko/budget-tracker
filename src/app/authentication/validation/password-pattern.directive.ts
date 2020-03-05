import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {CustomValidationService} from './custom-validation.service';

@Directive({
  selector: '[passwordPattern]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordPatternDirective, multi: true}]
})

export class PasswordPatternDirective {

  constructor(private customValidationService: CustomValidationService) {
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidationService.passwordValidation()(control);
  }

}
