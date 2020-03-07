import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StandardBtnDirective} from './buttons/standard-btn.directive';


@NgModule({
  declarations: [
    StandardBtnDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    StandardBtnDirective,
  ]
})
export class DirectivesModule {
}
