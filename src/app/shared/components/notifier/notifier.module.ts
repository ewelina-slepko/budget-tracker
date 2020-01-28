import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotifierComponent} from './notifier.component';

@NgModule({
  declarations: [
    NotifierComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    NotifierComponent,
  ]
})
export class NotifierModule { }
