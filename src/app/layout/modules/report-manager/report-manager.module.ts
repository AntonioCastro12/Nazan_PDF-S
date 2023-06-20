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

@NgModule({
  declarations: [
    ReportManagerComponent,
    OptionsComponent,
    ReportInventoryKardexComponent,
    ReportInventoryStockResumeComponent
  ],
  imports: [
    LuxonModule,
    CommonModule,
    ReportManagerRoutingModule,
    PrimeNgModule
  ]
})
export class ReportManagerModule { }
