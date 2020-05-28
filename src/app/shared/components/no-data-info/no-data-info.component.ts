import {Component, Input } from '@angular/core';

@Component({
  selector: 'no-data-info',
  templateUrl: './no-data-info.component.html',
  styleUrls: ['./no-data-info.component.scss']
})
export class NoDataInfoComponent {
  @Input() text: string;
}
