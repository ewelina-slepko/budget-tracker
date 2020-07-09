import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {formAnimation} from '../../../../../shared/animations/form-animation';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
  animations: formAnimation
})
export class FilterFormComponent implements OnInit {

  @Input() isFilterFormOpen: boolean;
  @Output() closeFilterFormEmitter = new EventEmitter();

  selectedAmount: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  closeFilterForm() {
    this.closeFilterFormEmitter.emit();
  }

  saveFilter() {

  }

  formatLabel(value: number) {
    this.selectedAmount = value;
    return this.selectedAmount + 'zł';
  }
}
