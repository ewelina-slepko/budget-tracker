import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ],
})
export class TextInputComponent implements ControlValueAccessor {


  @Input() name: string;
  @Input() type: string;
  @Input() status: string;

  val = '';
  passwordIsVisible: boolean;

  onChange: any = () => {
  };
  onTouch: any = () => {
  };

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    console.log(this);
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  togglePasswordVisibility() {
    this.passwordIsVisible = !this.passwordIsVisible;
    return this.passwordIsVisible ? this.type = 'text' : this.type = 'password';
  }
}
