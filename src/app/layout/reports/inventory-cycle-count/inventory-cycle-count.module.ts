import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryCycleCountRoutingModule } from './inventory-cycle-count-routing.module';
import { InventoryCycleCountComponent } from './inventory-cycle-count.component';


@NgModule({
  declarations: [
    InventoryCycleCountComponent
  ],
  imports: [
    CommonModule,
    InventoryCycleCountRoutingModule
  ]
})
export class InventoryCycleCountModule { }
