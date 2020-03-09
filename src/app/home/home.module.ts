import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './cards/dashboard/dashboard.component';
import {HomeRoutingModule} from './home-routing.module';
import {WalletComponent} from './cards/wallet/wallet.component';
import {BudgetsComponent} from './cards/budgets/budgets.component';
import {StatisticsComponent} from './cards/statistics/statistics.component';
import {WalletEditorComponent} from './cards/wallet/wallet-editor/wallet-editor.component';
import {WalletFormComponent} from './layouts/wallet-form/wallet-form.component';
import {WalletSettingsComponent} from './cards/initial-settings/wallet-settings/wallet-settings.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, WalletComponent, BudgetsComponent, StatisticsComponent, WalletEditorComponent, WalletFormComponent, WalletSettingsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
  ]
})
export class HomeModule {
}
