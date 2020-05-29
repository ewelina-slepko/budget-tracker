import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {

  @Input() text: string;
  @Output() openForm = new EventEmitter();

}
