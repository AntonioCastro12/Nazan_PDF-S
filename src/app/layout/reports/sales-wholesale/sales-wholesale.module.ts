import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesWholesaleRoutingModule } from './sales-wholesale-routing.module';
import { SalesWholesaleComponent } from './sales-wholesale.component';


@NgModule({
  declarations: [
    SalesWholesaleComponent
  ],
  imports: [
    CommonModule,
    SalesWholesaleRoutingModule
  ]
})
export class SalesWholesaleModule { }
