import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[namePattern]',
  providers: [{provide: NG_VALIDATORS, useExisting: NamePatternDirective, multi: true}]
})

export class NamePatternDirective {

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) {
      return null;
    }
    const regex = new RegExp('^[a-zA-Z0-9_.+-]*(?:[a-zA-Z][a-zA-Z0-9_.+-]*){2,}$');
    const valid = regex.test(control.value);
    return valid ? null : {invalidName: true};
  }
}
