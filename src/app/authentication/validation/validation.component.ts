import {Component, Input} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {

  @Input() form: NgForm;
  @Input() text: string;
  @Input() name: string;
}
