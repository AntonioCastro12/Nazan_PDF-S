import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutFrameComponent } from './pages/layout-frame/layout-frame.component';

const routes: Routes = [
  { path: '', redirectTo: 'reports', pathMatch: 'full' },
  {
    path: '',
    component: LayoutFrameComponent,
    children: [
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
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class LayoutManagerRoutingModule { }
