import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryComparisonRoutingModule } from './inventory-comparison-routing.module';
import { InventoryComparisonComponent } from './inventory-comparison.component';


@NgModule({
  declarations: [
    InventoryComparisonComponent
  ],
  imports: [
    CommonModule,
    InventoryComparisonRoutingModule
  ]
})
export class InventoryComparisonModule { }
