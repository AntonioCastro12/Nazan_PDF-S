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
  path: 'reports',
  loadChildren: () =>
    import('src/app/layout/modules/report-manager/report-manager.module').then(
      (m) => m.ReportManagerModule
    ),
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
