import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { PrimeNgModule } from 'src/app/shared/vendor/prime-ng';
import { LuxonModule } from 'luxon-angular';
import { ReportManagerRoutingModule } from './report-manager-routing.module';
import { ReportManagerComponent } from './report-manager.component';
import { ReportOrderListComponent } from './pages/report-order-list/report-order-list.component';
import { ReportOrderLogComponent } from './pages/report-log-list/report-order-log.component';
import { OptionsComponent } from 'src/app/shared/components/options/options.component';

@NgModule({
  declarations: [
    ReportManagerComponent,
    ReportOrderListComponent,
    ReportOrderLogComponent,
    OptionsComponent
  ],
  imports: [
    LuxonModule,
    CommonModule,
    ReportManagerRoutingModule,
    PrimeNgModule
  ]
})
export class ReportManagerModule { }
