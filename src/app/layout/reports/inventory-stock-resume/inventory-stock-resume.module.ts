import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryStockResumeRoutingModule } from './inventory-stock-resume-routing.module';
import { InventoryStockResumeComponent } from './inventory-stock-resume.component';


@NgModule({
  declarations: [
    InventoryStockResumeComponent
  ],
  imports: [
    CommonModule,
    InventoryStockResumeRoutingModule
  ]
})
export class InventoryStockResumeModule { }
