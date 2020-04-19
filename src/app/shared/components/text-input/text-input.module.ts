import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextInputComponent} from './text-input.component';
import {FormsModule} from '@angular/forms';
import {DirectivesModule} from '../../directives/directives.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [TextInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    BsDatepickerModule
  ],
  exports: [TextInputComponent]
})
export class TextInputModule {
}
