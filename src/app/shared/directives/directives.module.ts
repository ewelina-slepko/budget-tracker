import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StandardBtnDirective} from './buttons/standard-btn.directive';
import { StandardInputDirective } from './inputs/standard-input.directive';


@NgModule({
  declarations: [
    StandardBtnDirective,
    StandardInputDirective,
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
