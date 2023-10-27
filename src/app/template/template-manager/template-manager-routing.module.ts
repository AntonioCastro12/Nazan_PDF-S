import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateManagerComponent } from './template-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: TemplateManagerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import(
            'src/app/layout/modules/home-manager/home-manager.module'
          ).then((m) => m.HomeManagerModule),
      },
      // {
      //   path: 'reports',
      //   loadChildren: () =>
      //     import('samples/report-manager/report-manager.module').then(
      //       (m) => m.ReportManagerModule
      //     ),
      // },

      {
        path: 'inventory-kardex',
        loadChildren: () =>
          import(
            'src/app/layout/reports/inventory-kardex/inventory-kardex.module'
          ).then((m) => m.InventoryKardexModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateManagerRoutingModule {}
