import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './cards/dashboard/dashboard.component';
import {HomeRoutingModule} from './home-routing.module';
import { InitialSettingsComponent } from './cards/initial-settings/initial-settings.component';
import { WalletComponent } from './cards/wallet/wallet.component';
import { BudgetsComponent } from './cards/budgets/budgets.component';
import { StatisticsComponent } from './cards/statistics/statistics.component';
import { WalletEditorComponent } from './cards/wallet/wallet-editor/wallet-editor.component';
import { WalletFormComponent } from './layouts/wallet-form/wallet-form.component';



@NgModule({
  declarations: [DashboardComponent, InitialSettingsComponent, WalletComponent, BudgetsComponent, StatisticsComponent, WalletEditorComponent, WalletFormComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }