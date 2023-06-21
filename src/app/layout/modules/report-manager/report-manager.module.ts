import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { PrimeNgModule } from 'src/app/shared/vendor/prime-ng';
import { LuxonModule } from 'luxon-angular';
import { ReportManagerRoutingModule } from './report-manager-routing.module';
import { ReportManagerComponent } from './report-manager.component';
import { OptionsComponent } from 'src/app/shared/components/options/options.component';
import { ReportInventoryKardexComponent } from './pages/report-inventory-cardex/report-inventory-kardex.component';
import { ReportInventoryStockResumeComponent } from './pages/report-inventory-stock-resume/report-inventory-stock-resume.component';
import { ReportInventoryComparisonComponent } from './pages/report-inventory-comparison/report-inventory-comparison.component';
import { ReportInventoryPodComponent } from './pages/report-inventory-pod/report-inventory-pod.component';
import { ReportPointProgramDetailPointsComponent } from './pages/report-point-program-detail-points/report-point-program-detail-points.component';
import { ReportPointProgramDetailWalletComponent } from './pages/report-point-program-detail-wallet/report-point-program-detail-wallet.component';

@NgModule({
  declarations: [
    ReportManagerComponent,
    OptionsComponent,
    ReportInventoryKardexComponent,
    ReportInventoryStockResumeComponent,
    ReportInventoryComparisonComponent,
    ReportInventoryPodComponent,
    ReportPointProgramDetailPointsComponent,
    ReportPointProgramDetailWalletComponent
  ],
  imports: [
    LuxonModule,
    CommonModule,
    ReportManagerRoutingModule,
    PrimeNgModule
  ]
})
export class ReportManagerModule { }
