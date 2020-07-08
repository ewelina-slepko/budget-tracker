import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {formAnimation} from '../../../../../shared/animations/form-animation';

@Component({
  selector: 'filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
  animations: formAnimation
})
export class FilterFormComponent implements OnInit {

  @Input() isFilterFormOpen: boolean;
  @Output() closeFilterFormEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  closeFilterForm() {
    this.closeFilterFormEmitter.emit();
  }

}
