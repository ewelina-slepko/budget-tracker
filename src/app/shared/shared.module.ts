import {NgModule} from '@angular/core';
import {DayOfMonthSelectComponent} from './components/day-of-month-select/day-of-month-select.component';
import {CommonModule} from '@angular/common';
import {ImgSliderComponent} from './animations/img-slider/img-slider.component';
import { CardSliderComponent } from './animations/card-slider/card-slider.component';
import {CurrencyPipe} from './pipes/currency.pipe';
import { NoDataInfoComponent } from './components/no-data-info/no-data-info.component';

@NgModule({
  declarations: [
    DayOfMonthSelectComponent,
    ImgSliderComponent,
    CardSliderComponent,
    CurrencyPipe,
    NoDataInfoComponent
  ],
  exports: [
    DayOfMonthSelectComponent,
    ImgSliderComponent,
    CardSliderComponent,
    CurrencyPipe,
    NoDataInfoComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule {
}
