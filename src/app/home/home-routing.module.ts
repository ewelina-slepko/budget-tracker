import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './cards/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {InitialSettingsComponent} from './cards/initial-settings/initial-settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'initialsettings'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'initialsettings',
    component: InitialSettingsComponent
}
]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
