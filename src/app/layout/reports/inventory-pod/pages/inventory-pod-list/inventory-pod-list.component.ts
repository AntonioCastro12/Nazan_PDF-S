import { Component } from '@angular/core';
import { InventoryPodStateService } from '../../services';
import { inventoryPodResponseName } from '../../models';

@Component({
  selector: 'inventory-pod-list',
  templateUrl: './inventory-pod-list.component.html',
  styleUrls: ['./inventory-pod-list.component.scss'],
})
export class InventoryPodListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  inventoryPodResponseName = inventoryPodResponseName;

  searchText = '';

  constructor(public _inventoryPod: InventoryPodStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
