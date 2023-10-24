import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryKardexRoutingModule } from './inventory-kardex-routing.module';
import { InventoryKardexComponent } from './inventory-kardex.component';
import { InventoryKardexListComponent } from './pages/inventory-kardex-list/inventory-kardex-list.component';
import { InventoryKardexFormComponent } from './pages/inventory-kardex-form/inventory-kardex-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';

@NgModule({
  declarations: [
    InventoryKardexComponent,
    InventoryKardexListComponent,
    InventoryKardexFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    InventoryKardexRoutingModule,
  ],
})
export class InventoryKardexModule {}
