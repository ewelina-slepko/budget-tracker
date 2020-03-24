import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './cards/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {WalletFormComponent} from './layouts/wallet-form/wallet-form.component';
import {InitialSettingsComponent} from './cards/initial-settings/initial-settings.component';
import {IncomeFormComponent} from './layouts/income-form/income-form.component';
import {BudgetsFormComponent} from './layouts/budgets-form/budgets-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
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
