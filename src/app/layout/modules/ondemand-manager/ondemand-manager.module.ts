import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { PrimeNgModule } from 'src/app/shared/vendor/prime-ng';
import { LuxonModule } from 'luxon-angular';
import { OnDemandManagerRoutingModule } from './ondemand-manager-routing.module';
import { OnDemandManagerComponent } from './ondemand-manager.component';
import { OndemandProcessOrdersComponent } from './pages/ondemand-process-orders/ondemand-process-orders.component';
import { OndemandCloseOrdersComponent } from './pages/ondemand-close-orders/ondemand-close-orders.component';

@NgModule({
  declarations: [
    OnDemandManagerComponent,
    OndemandProcessOrdersComponent,
    OndemandCloseOrdersComponent,

  ],
  imports: [
    LuxonModule,
    CommonModule,
    OnDemandManagerRoutingModule,
    PrimeNgModule
  ]
})
export class OnDemandManagerModule { }
