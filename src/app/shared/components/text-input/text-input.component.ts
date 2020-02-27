import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class TextInputComponent {

  @ViewChild('customInput') customInput: ElementRef;

  @Input() name: string;
  @Input() type: string;
  @Input() field: string;

  @Input() isInputValid: boolean;

}
