import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WalletFormComponent} from './shared/forms/wallet-form/wallet-form.component';
import {InitialSettingsComponent} from './initial-settings/initial-settings.component';
import {IncomeFormComponent} from './shared/forms/income-form/income-form.component';
import {BudgetsFormComponent} from './shared/forms/budgets-form/budgets-form.component';
import {PanelComponent} from './panel/panel.component';
import {DashboardComponent} from './panel/cards/dashboard/dashboard.component';
import {WalletComponent} from './panel/cards/wallet/wallet.component';
import {BudgetsComponent} from './panel/cards/budgets/budgets.component';
import {TransactionsComponent} from './panel/cards/transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'budgets',
        component: BudgetsComponent
      },
    ]
  },
  {
    path: 'initialsettings',
    component: InitialSettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'step1'
      },
      {
        path: 'step1',
        component: WalletFormComponent
      },
      {
        path: 'step2',
        component: IncomeFormComponent
      },
      {
        path: 'step3',
        component: BudgetsFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
