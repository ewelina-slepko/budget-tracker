import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextInputComponent} from './text-input.component';
import {FormsModule} from '@angular/forms';
import {DirectivesModule} from '../../directives/directives.module';


@NgModule({
  declarations: [TextInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule
  ],
  exports: [TextInputComponent]
})
export class TextInputModule {
}
