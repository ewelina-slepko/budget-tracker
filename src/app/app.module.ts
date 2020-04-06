import {BrowserModule, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NotifierModule} from './shared/components/notifier/notifier.module';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {DirectivesModule} from './shared/directives/directives.module';
import {SliderComponent} from './landing-page/slider/slider.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import * as Hammer from 'hammerjs';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: {direction: Hammer.DIRECTION_ALL}
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SliderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NotifierModule,
    DirectivesModule,
    HammerModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
