import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryPodRoutingModule } from './inventory-pod-routing.module';
import { InventoryPodComponent } from './inventory-pod.component';


@NgModule({
  declarations: [
    InventoryPodComponent
  ],
  imports: [
    CommonModule,
    InventoryPodRoutingModule
  ]
})
export class InventoryPodModule { }
