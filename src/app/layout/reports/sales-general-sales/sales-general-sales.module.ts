import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesGeneralSalesRoutingModule } from './sales-general-sales-routing.module';
import { SalesGeneralSalesComponent } from './sales-general-sales.component';


@NgModule({
  declarations: [
    SalesGeneralSalesComponent
  ],
  imports: [
    CommonModule,
    SalesGeneralSalesRoutingModule
  ]
})
export class SalesGeneralSalesModule { }
