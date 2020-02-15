import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [DashboardComponent, NavbarComponent, HomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
