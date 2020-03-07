import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HomeRoutingModule} from './home-routing.module';
import { InitialSettingsComponent } from './initial-settings/initial-settings.component';



@NgModule({
  declarations: [DashboardComponent, InitialSettingsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
