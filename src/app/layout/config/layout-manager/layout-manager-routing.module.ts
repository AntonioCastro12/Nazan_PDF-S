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
        path: 'reports',
        loadChildren: () =>
          import('src/app/layout/modules/report-manager/report-manager.module').then(
            (m) => m.ReportManagerModule
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
