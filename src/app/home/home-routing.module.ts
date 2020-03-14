import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './cards/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {WalletFormComponent} from "./layouts/wallet-form/wallet-form.component";
import {InitialSettingsComponent} from "./cards/initial-settings/initial-settings.component";

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
    ]
  } ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
