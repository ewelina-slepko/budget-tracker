import {AfterViewInit, Component, forwardRef, Injector, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

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
export class TextInputComponent implements AfterViewInit, ControlValueAccessor {

  constructor(public injector: Injector) {
  }

  @Input() name: string;
  @Input() type: string;
  @Input() status: string;

  val = '';
  passwordIsVisible: boolean;
  ngControl: NgControl

  onChange: any = () => {
  };
  onTouch: any = () => {
  };

  ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl, null);
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
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
