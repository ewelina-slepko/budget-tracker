import { BrowserModule, HammerModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NotifierModule} from './shared/components/notifier/notifier.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {DirectivesModule} from './shared/directives/directives.module';
import { SliderComponent } from './landing-page/slider/slider.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

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
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
