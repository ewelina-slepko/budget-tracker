import {BrowserModule, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NotifierModule} from './shared/components/notifier/notifier.module';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {DirectivesModule} from './shared/directives/directives.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as Hammer from 'hammerjs';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {SharedModule} from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';

export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: {direction: Hammer.DIRECTION_ALL}
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
    AppRoutingModule,
    NotifierModule,
    DirectivesModule,
    HammerModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
