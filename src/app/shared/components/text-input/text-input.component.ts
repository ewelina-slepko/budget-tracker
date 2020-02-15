import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class TextInputComponent implements OnInit {

  @Input() name: string;
  @Input() field: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
