import {Component, Input} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'validation-general-msg',
  templateUrl: './validation-general-msg.component.html',
  styleUrls: ['./validation-general-msg.component.scss']
})
export class ValidationGeneralMsgComponent {

  @Input() form: NgForm;

}
