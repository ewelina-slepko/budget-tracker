import {NgModule} from '@angular/core';
import {DayOfMonthSelectComponent} from './components/day-of-month-select/day-of-month-select.component';
import {CommonModule} from '@angular/common';
import {ImgSliderComponent} from './animations/img-slider/img-slider.component';
import { CardSliderComponent } from './animations/card-slider/card-slider.component';
import {CurrencyPipe} from './pipes/currency.pipe';
import { NoDataInfoComponent } from './components/no-data-info/no-data-info.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    DayOfMonthSelectComponent,
    ImgSliderComponent,
    CardSliderComponent,
    CurrencyPipe,
    NoDataInfoComponent,
    AddButtonComponent,
    CheckboxComponent
  ],
  exports: [
    DayOfMonthSelectComponent,
    ImgSliderComponent,
    CardSliderComponent,
    CurrencyPipe,
    NoDataInfoComponent,
    AddButtonComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule {
}
