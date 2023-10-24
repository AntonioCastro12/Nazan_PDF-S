import { Component } from '@angular/core';
import { InventoryKardexStateService } from '../../services';

@Component({
  selector: 'app-inventory-kardex-list',
  templateUrl: './inventory-kardex-list.component.html',
  styleUrls: ['./inventory-kardex-list.component.scss']
})
export class InventoryKardexListComponent {

  constructor(public _inventoryKardex: InventoryKardexStateService){

  }

}
