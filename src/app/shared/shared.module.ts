import {NgModule} from '@angular/core';
import {DayOfMonthSelectComponent} from './components/day-of-month-select/day-of-month-select.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    DayOfMonthSelectComponent
  ],
  exports: [
    DayOfMonthSelectComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
