import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', redirectTo: 'layout', pathMatch: 'full' },
{
  path: 'layout',
  loadChildren: () =>
    import('src/app/layout/config/layout-manager/layout-manager.module').then(
      (m) => m.LayoutManagerModule
    ),
},
{
  path: 'log',
  loadChildren: () =>
    import('src/app/layout/modules/log-manager/log-manager.module').then(
      (m) => m.LogManagerModule
    ),
},
{
  path: 'reports',
  loadChildren: () =>
    import('src/app/layout/modules/report-manager/report-manager.module').then(
      (m) => m.ReportManagerModule
    ),
},
{
  path: 'ondemand',
  loadChildren: () =>
    import('src/app/layout/modules/ondemand-manager/ondemand-manager.module').then(
      (m) => m.OnDemandManagerModule
    ),
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
