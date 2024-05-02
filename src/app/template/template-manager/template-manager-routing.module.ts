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
      {
        path: 'inventory-comparison',
        loadChildren: () =>
          import(
            'src/app/layout/reports/inventory-comparison/inventory-comparison.module'
          ).then((m) => m.InventoryComparisonModule),
      },
      {
        path: 'inventory-cycle-count',
        loadChildren: () =>
          import(
            'src/app/layout/reports/inventory-cycle-count/inventory-cycle-count.module'
          ).then((m) => m.InventoryCycleCountModule),
      },
      {
        path: 'inventory-pod',
        loadChildren: () =>
          import(
            'src/app/layout/reports/inventory-pod/inventory-pod.module'
          ).then((m) => m.InventoryPodModule),
      },
      {
        path: 'inventory-upload',
        loadChildren: () =>
          import(
            'src/app/layout/reports/inventory-upload/inventory-upload.module'
          ).then((m) => m.InventoryUploadModule),
      },
      {
        path: 'inventory-sap-xstore',
        loadChildren: () =>
          import(
            'src/app/layout/reports/inventory-sap-xstore/inventory-sap-xstore.module'
          ).then((m) => m.InventorySapXstoreModule),
      },
      {
        path: 'inventory-stock-resume',
        loadChildren: () =>
          import(
            'src/app/layout/reports/inventory-stock-resume/inventory-stock-resume.module'
          ).then((m) => m.InventoryStockResumeModule),
      },
      {
        path: 'point-program-detail',
        loadChildren: () =>
          import(
            'src/app/layout/reports/point-program-detail-points/point-program-detail-points.module'
          ).then((m) => m.PointProgramDetailPointsModule),
      },
      {
        path: 'point-program-detail-wallet',
        loadChildren: () =>
          import(
            'src/app/layout/reports/point-program-detail-wallet/point-program-detail-wallet.module'
          ).then((m) => m.PointProgramDetailWalletModule),
      },
      {
        path: 'point-program-total-movement',
        loadChildren: () =>
          import(
            'src/app/layout/reports/point-program-total-movement/point-program-total-movement.module'
          ).then((m) => m.PointProgramTotalMovementModule),
      },
      {
        path: 'sales-general-sales',
        loadChildren: () =>
          import(
            'src/app/layout/reports/sales-general-sales/sales-general-sales.module'
          ).then((m) => m.SalesGeneralSalesModule),
      },
      {
        path: 'sales-invoice-total',
        loadChildren: () =>
          import(
            'src/app/layout/reports/sales-invoice-total/sales-invoice-total.module'
          ).then((m) => m.SalesInvoiceTotalModule),
      },
      {
        path: 'sales-wholesale',
        loadChildren: () =>
          import(
            'src/app/layout/reports/sales-wholesale/sales-wholesale.module'
          ).then((m) => m.SalesWholesaleModule),
      },
      {
        path: 'segment-affiliated-kipon',
        loadChildren: () =>
          import(
            'src/app/layout/reports/segment-affiliated-kipon/segment-affiliated-kipon.module'
          ).then((m) => m.SegmentAffiliatedKiponModule),
      },
      {
        path: 'segment-collaborators-nazan',
        loadChildren: () =>
          import(
            'src/app/layout/reports/segment-collaborators-nazan/segment-collaborators-nazan.module'
          ).then((m) => m.SegmentCollaboratorsNazanModule),
      },
      {
        path: 'orders-dashboard',
        loadChildren: () =>
          import(
            'src/app/layout/reports/orders-dashboard/orders-dashboard.module'
          ).then((m) => m.OrdersDashboardModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateManagerRoutingModule {}
