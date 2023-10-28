import { Component } from '@angular/core';
import {
  InventoryComparisonApiService,
  InventoryComparisonStateService,
} from '../../services';

@Component({
  selector: 'inventory-comparison-options',
  templateUrl: './inventory-comparison-options.component.html',
  styleUrls: ['./inventory-comparison-options.component.scss'],
})
export class InventoryComparisonOptionsComponent {
  TEMPLATE_TEXT = {
    showSearch: 'Buscar los registros',
    showChart: 'Ver gráfico',
    showRefresh: 'Renovar la lista',
    showDownload: 'Exportar registros',
    showEye: 'Mostrar registro',
    showFavorite: 'Agregar a favoritos',
    title: 'Herramientas de reporte',
  };

  showSearch: any = true;
  showChart: any = true;
  showRefresh: any = true;
  showDownload: any = true;
  showEye: any = true;
  showFavorite: any = true;

  constructor(
    public _inventoryComparison: InventoryComparisonStateService,
    private _inventoryComparisonApi: InventoryComparisonApiService
  ) {}

  handleSearch() {
    this._inventoryComparison.state.isVisibleForm =
      !this._inventoryComparison.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._inventoryComparison.state.isLoadingList = true;

    // this._inventoryComparisonApi
    //   .inventoryKardexProduct(
    //     this._inventoryComparison.state.inventoryComparisonDTO
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       this._inventoryComparison.state.inventoryComparisonResponse =
    //         data;
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //     complete: () => {
    //       this._inventoryComparison.state.isLoadingList = false;
    //     },
    //   });
  }
  handleDownload() {}
  handleFavorite() {}
}
