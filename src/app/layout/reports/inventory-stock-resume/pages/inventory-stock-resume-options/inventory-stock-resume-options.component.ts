import { Component } from '@angular/core';
import {
  InventoryStockResumeApiService,
  InventoryStockResumeStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-stock-resume-options',
  templateUrl: './inventory-stock-resume-options.component.html',
  styleUrls: ['./inventory-stock-resume-options.component.scss'],
})
export class InventoryStockResumeOptionsComponent {
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
    public _inventoryStockResume: InventoryStockResumeStateService,
    private _inventoryStockResumeApi: InventoryStockResumeApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._inventoryStockResume.state.isVisibleForm =
      !this._inventoryStockResume.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._inventoryStockResume.state.isLoadingList = true;

    this._inventoryStockResumeApi
      .inventoryStockResume(
        this._inventoryStockResume.state.inventoryStockResumeDTO
      )
      .subscribe({
        next: (data) => {
          this._inventoryStockResume.state.inventoryStockResumeResponse = data;
          this._inventoryStockResume.state.inventoryStockResumeResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.log(error);
        },
        complete: () => {
          this._inventoryStockResume.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}