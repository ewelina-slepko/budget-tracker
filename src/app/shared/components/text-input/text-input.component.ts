import {Component, Input} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class TextInputComponent {

  @Input() name: string;
  @Input() field: string;


}
