import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './cards/dashboard/dashboard.component';
import {HomeRoutingModule} from './home-routing.module';
import {WalletComponent} from './cards/wallet/wallet.component';
import {BudgetsComponent} from './cards/budgets/budgets.component';
import {StatisticsComponent} from './cards/statistics/statistics.component';
import {WalletEditorComponent} from './cards/wallet/wallet-editor/wallet-editor.component';
import {WalletFormComponent} from './layouts/wallet-form/wallet-form.component';
import {FormsModule} from '@angular/forms';
import { InitialSettingsComponent } from './cards/initial-settings/initial-settings.component';
import {TextInputModule} from '../shared/components/text-input/text-input.module';
import {DirectivesModule} from '../shared/directives/directives.module';
import { IncomeFormComponent } from './layouts/income-form/income-form.component';
import {AuthenticationModule} from '../authentication/authentication.module';
import {ValidationGeneralMsgComponent} from './home-shared/validation-general-msg/validation-general-msg.component';

@NgModule({
  declarations: [DashboardComponent,
    WalletComponent, BudgetsComponent,
    StatisticsComponent,
    WalletEditorComponent,
    WalletFormComponent,
    InitialSettingsComponent,
    IncomeFormComponent,
    ValidationGeneralMsgComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    TextInputModule,
    DirectivesModule,
    AuthenticationModule,
  ]
})
export class HomeModule {
}
