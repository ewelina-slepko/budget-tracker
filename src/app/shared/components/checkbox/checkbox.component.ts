import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  @Input() checked: boolean;
  @Input() label: string;
  @Output() executeFunction = new EventEmitter();

  execute() {
    this.executeFunction.emit();
  }
}
