import { Component } from '@angular/core';
import { InventoryKardexStateService } from '../../services';
import { InventoryKardexApiService } from '../../services/inventory-kardex-api.service';

@Component({
  selector: 'inventory-kardex-options',
  templateUrl: './inventory-kardex-options.component.html',
  styleUrls: ['./inventory-kardex-options.component.scss'],
})
export class InventoryKardexOptionsComponent {
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
    public _inventoryKardex: InventoryKardexStateService,
    private _inventoryKardexApi: InventoryKardexApiService
  ) {}

  handleSearch() {
    this._inventoryKardex.state.isVisibleForm =
      !this._inventoryKardex.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._inventoryKardex.state.isLoadingList = true;

    this._inventoryKardexApi
      .inventoryKardexProduct(this._inventoryKardex.state.kardexProductDTO)
      .subscribe({
        next: (data) => {
          this._inventoryKardex.state.kardexProductResponse = data;
          this._inventoryKardex.state.kardexProductResponseList = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._inventoryKardex.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}
