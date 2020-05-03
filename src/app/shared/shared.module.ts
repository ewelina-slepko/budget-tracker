import {NgModule} from '@angular/core';
import {DayOfMonthSelectComponent} from './components/day-of-month-select/day-of-month-select.component';
import {CommonModule} from '@angular/common';
import {ImgSliderComponent} from './components/img-slider/img-slider.component';
import { CardSliderComponent } from './components/card-slider/card-slider.component';

@NgModule({
  declarations: [
    DayOfMonthSelectComponent,
    ImgSliderComponent,
    CardSliderComponent
  ],
  exports: [
    DayOfMonthSelectComponent,
    ImgSliderComponent,
    CardSliderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
