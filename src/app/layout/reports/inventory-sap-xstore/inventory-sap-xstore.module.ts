import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventorySapXstoreRoutingModule } from './inventory-sap-xstore-routing.module';
import { InventorySapXstoreComponent } from './inventory-sap-xstore.component';


@NgModule({
  declarations: [
    InventorySapXstoreComponent
  ],
  imports: [
    CommonModule,
    InventorySapXstoreRoutingModule
  ]
})
export class InventorySapXstoreModule { }
