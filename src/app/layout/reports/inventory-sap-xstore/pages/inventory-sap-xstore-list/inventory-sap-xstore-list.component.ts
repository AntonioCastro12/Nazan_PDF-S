import { Component } from '@angular/core';
import { InventorySapXstoreApstateService } from '../../services';
import { inventorySapXstoreResponseName } from '../../models';

@Component({
  selector: 'inventory-sap-xstore-list',
  templateUrl: './inventory-sap-xstore-list.component.html',
  styleUrls: ['./inventory-sap-xstore-list.component.scss'],
})
export class InventorySapXstoreListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  inventorySapXstoreResponseName = inventorySapXstoreResponseName;

  searchText = '';

  constructor(public _inventorySapXstoreAp: InventorySapXstoreApstateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
