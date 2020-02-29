import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class TextInputComponent {

  @Input() name: string;
  @Input() type: string;
  @Input() field: string;

  @Input() isInputValid: boolean;

  passwordIsVisible: boolean;

  togglePasswordVisibility() {
    this.passwordIsVisible = !this.passwordIsVisible;
    return this.passwordIsVisible ? this.type = 'text' : this.type = 'password';
  }
}
