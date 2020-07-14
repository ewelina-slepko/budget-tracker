import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {formAnimation} from '../../../../../shared/animations/form-animation';
import {FilterType} from './dtos';

@Component({
  selector: 'filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
  animations: formAnimation
})
export class FilterFormComponent {

  @Input() isFilterFormOpen: boolean;
  @Output() closeFilterFormEmitter = new EventEmitter();

  selectedType: string;
  filterType = FilterType;

  closeFilterForm() {
    this.closeFilterFormEmitter.emit();
  }

  saveFilter(form) {
    //TODO
  }

  selectType(type) {
    this.selectedType = type;
  }
}
