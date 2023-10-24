import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryKardexListComponent } from './pages/inventory-kardex-list/inventory-kardex-list.component';
import { InventoryKardexComponent } from './inventory-kardex.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },

  {
    path: '',
    component: InventoryKardexComponent,
    children: [
      {
        path: 'list',
        component: InventoryKardexListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryKardexRoutingModule {}
