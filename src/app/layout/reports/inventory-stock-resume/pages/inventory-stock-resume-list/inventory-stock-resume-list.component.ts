import { Component } from '@angular/core';
import { InventoryStockResumeStateService } from '../../services';
import { inventoryStockResumeResponseName } from '../../models';

@Component({
  selector: 'inventory-stock-resume-list',
  templateUrl: './inventory-stock-resume-list.component.html',
  styleUrls: ['./inventory-stock-resume-list.component.scss'],
})
export class InventoryStockResumeListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  inventoryStockResumeResponseName = inventoryStockResumeResponseName;

  searchText = '';

  constructor(public _inventoryStockResume: InventoryStockResumeStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
