import { Component } from '@angular/core';
import { InventoryKardexStateService } from '../../services';
import { KardexProductResponseName } from '../../models';

@Component({
  selector: 'inventory-kardex-list',
  templateUrl: './inventory-kardex-list.component.html',
  styleUrls: ['./inventory-kardex-list.component.scss'],
})
export class InventoryKardexListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  KardexProductResponseName = KardexProductResponseName;

  isLoading = true;
  searchText = '';

  constructor(public _inventoryKardex: InventoryKardexStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
