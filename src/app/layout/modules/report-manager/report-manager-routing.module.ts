import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportManagerComponent } from './report-manager.component';
import { ReportInventoryKardexComponent } from './pages/report-inventory-cardex/report-inventory-kardex.component';
import { ReportInventoryStockResumeComponent } from './pages/report-inventory-stock-resume/report-inventory-stock-resume.component';
import { ReportInventoryComparisonComponent } from './pages/report-inventory-comparison/report-inventory-comparison.component';
import { ReportInventoryPodComponent } from './pages/report-inventory-pod/report-inventory-pod.component';
import { ReportPointProgramDetailPointsComponent } from './pages/report-point-program-detail-points/report-point-program-detail-points.component';
import { ReportPointProgramDetailWalletComponent } from './pages/report-point-program-detail-wallet/report-point-program-detail-wallet.component';
import { ReportSalesInvoiceTotal } from './pages/report-sales-invoice-total/report-sales-invoice-total.component';
import { ReportInventorySapXtoreComponent } from './pages/report-inventory-sap-xstore/report-inventory-sap-xstore.component';
import { ReportPointProgramTotalMovementComponent } from './pages/report-point-program-total-movement/report-point-program-total-movement.component';
import { ReportSalesGeneralSales } from './pages/report-sales-general-sales/report-sales-general-sales.component';
import { ReportSegmentAffiliatedKipon } from './pages/report-segment-affiliated-kipon/report-segment-affiliated-kipon.component';
import { ReportSegmentCollaboratorsNazan } from './pages/report-segment-collaborators-nazan/report-segment-collaborators-nazan.component';


const routes: Routes = [{ path: '', redirectTo: 'inventory', pathMatch: 'full' }, {
  path: '',
  component: ReportManagerComponent,
  children: [
    { path: 'inventory', redirectTo: 'inventory/kardex', pathMatch: 'full' },
    { path: 'inventory/kardex', component: ReportInventoryKardexComponent },
    { path: 'inventory/stock-resume', component: ReportInventoryStockResumeComponent },
    { path: 'inventory/comparison', component: ReportInventoryComparisonComponent },
    { path: 'inventory/pod', component: ReportInventoryPodComponent },
    { path: 'inventory/sap-xstore', component: ReportInventorySapXtoreComponent },
    { path: 'point-program/total-movement', component: ReportPointProgramTotalMovementComponent },
    { path: 'point-program/detail-points', component: ReportPointProgramDetailPointsComponent },
    { path: 'point-program/detail-wallet', component: ReportPointProgramDetailWalletComponent },
    { path: 'sales/invoice-total', component: ReportSalesInvoiceTotal },
    { path: 'sales/general-sales', component: ReportSalesGeneralSales },
    { path: 'segments/affiliated-kipon', component: ReportSegmentAffiliatedKipon },
    { path: 'segments/collaborators-nazan', component: ReportSegmentCollaboratorsNazan },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportManagerRoutingModule { }
