import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './panel/cards/dashboard/dashboard.component';
import {HomeRoutingModule} from './home-routing.module';
import {WalletComponent} from './panel/cards/wallet/wallet.component';
import {BudgetsComponent} from './panel/cards/budgets/budgets.component';
import {StatisticsComponent} from './panel/cards/dashboard/statistics/statistics.component';
import {WalletEditorComponent} from './panel/cards/wallet/wallet-editor/wallet-editor.component';
import {WalletFormComponent} from './shared/forms/wallet-form/wallet-form.component';
import {FormsModule} from '@angular/forms';
import {InitialSettingsComponent} from './initial-settings/initial-settings.component';
import {TextInputModule} from '../shared/components/text-input/text-input.module';
import {DirectivesModule} from '../shared/directives/directives.module';
import {IncomeFormComponent} from './shared/forms/income-form/income-form.component';
import {AuthenticationModule} from '../authentication/authentication.module';
import {ValidationGeneralMsgComponent} from './shared/validation-general-msg/validation-general-msg.component';
import {IteratePipe} from '../shared/pipes/fill-array.pipe';
import {BudgetsFormComponent} from './shared/forms/budgets-form/budgets-form.component';
import {SharedModule} from '../shared/shared.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {HomeComponent} from './home.component';
import {PanelComponent} from './panel/panel.component';
import {NavbarComponent} from './panel/navbar/navbar.component';
import {TransactionsComponent} from './panel/cards/transactions/transactions.component';
import {WalletMainInfoComponent} from './panel/cards/wallet/wallet-main-info/wallet-main-info.component';
import { BudgetsListElementComponent } from './panel/cards/budgets/budgets-list-element/budgets-list-element.component';
import { BudgetsInitialSettingsComponent } from './initial-settings/budgets-initial-settings/budgets-initial-settings.component';

@NgModule({
  declarations: [DashboardComponent,
    HomeComponent,
    WalletComponent, BudgetsComponent,
    StatisticsComponent,
    WalletEditorComponent,
    WalletFormComponent,
    InitialSettingsComponent,
    IncomeFormComponent,
    ValidationGeneralMsgComponent,
    IteratePipe,
    BudgetsFormComponent,
    PanelComponent,
    NavbarComponent,
    TransactionsComponent,
    WalletMainInfoComponent,
    BudgetsListElementComponent,
    BudgetsInitialSettingsComponent
  ],
  exports: [
    InitialSettingsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    TextInputModule,
    DirectivesModule,
    AuthenticationModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class HomeModule {
}
