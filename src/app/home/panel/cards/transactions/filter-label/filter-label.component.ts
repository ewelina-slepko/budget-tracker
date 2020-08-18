import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'filter-label',
  templateUrl: './filter-label.component.html',
  styleUrls: ['./filter-label.component.scss']
})
export class FilterLabelComponent {

  @Input() name: string;
  @Output() removeFilterEmitter = new EventEmitter();

  removeFilter() {
    this.removeFilterEmitter.emit();
  }
}
