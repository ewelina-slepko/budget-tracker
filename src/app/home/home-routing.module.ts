import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './cards/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {WalletSettingsComponent} from './cards/initial-settings/wallet-settings/wallet-settings.component';

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
    path: 'initialsettings/step1',
    component: WalletSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
