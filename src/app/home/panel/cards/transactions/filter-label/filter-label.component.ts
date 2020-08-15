import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'filter-label',
  templateUrl: './filter-label.component.html',
  styleUrls: ['./filter-label.component.scss']
})
export class FilterLabelComponent implements OnInit {

  @Input() name: string;
  @Output() removeFilterEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }


  removeFilter() {
    this.removeFilterEmitter.emit();
  }
}
