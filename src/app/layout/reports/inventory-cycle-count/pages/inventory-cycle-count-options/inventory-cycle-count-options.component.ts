import { Component } from '@angular/core';
import {
  InventoryCycleCountApiService,
  InventoryCycleCountStateService,
} from '../../services';

@Component({
  selector: 'inventory-cycle-count-options',
  templateUrl: './inventory-cycle-count-options.component.html',
  styleUrls: ['./inventory-cycle-count-options.component.scss'],
})
export class InventoryCycleCountOptionsComponent {
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
    public _inventoryCycleCount: InventoryCycleCountStateService,
    private _inventoryCycleCountApi: InventoryCycleCountApiService
  ) {}

  handleSearch() {
    this._inventoryCycleCount.state.isVisibleForm =
      !this._inventoryCycleCount.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._inventoryCycleCount.state.isLoadingList = true;

    this._inventoryCycleCountApi
      .inventoryCycleCountDTO(
        this._inventoryCycleCount.state.inventoryCycleCountDTO
      )
      .subscribe({
        next: (data) => {
          this._inventoryCycleCount.state.inventoryCycleCountResponse = data;
          this._inventoryCycleCount.state.inventoryCycleCountResponseList =
            data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._inventoryCycleCount.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}
