import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesInvoiceTotalRoutingModule } from './sales-invoice-total-routing.module';
import { SalesInvoiceTotalComponent } from './sales-invoice-total.component';


@NgModule({
  declarations: [
    SalesInvoiceTotalComponent
  ],
  imports: [
    CommonModule,
    SalesInvoiceTotalRoutingModule
  ]
})
export class SalesInvoiceTotalModule { }
