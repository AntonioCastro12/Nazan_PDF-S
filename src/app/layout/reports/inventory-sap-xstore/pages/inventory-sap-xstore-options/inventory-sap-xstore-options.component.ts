import { Component } from '@angular/core';
import {
  InventorySapXstoreApiService,
  InventorySapXstoreApstateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-sap-xstore-options',
  templateUrl: './inventory-sap-xstore-options.component.html',
  styleUrls: ['./inventory-sap-xstore-options.component.scss'],
})
export class InventorySapXstoreOptionsComponent {
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
    public _inventorySapXstoreApstate: InventorySapXstoreApstateService,
    private _inventorySapXstoreApi: InventorySapXstoreApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._inventorySapXstoreApstate.state.isVisibleForm =
      !this._inventorySapXstoreApstate.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._inventorySapXstoreApstate.state.isLoadingList = true;

    this._inventorySapXstoreApi.inventorySapXstore().subscribe({
      next: (data) => {
        this._inventorySapXstoreApstate.state.inventorySapXstoreResponse = data;
        this._inventorySapXstoreApstate.state.inventorySapXstoreResponseList =
          data;
      },
      error: (error) => {
        this._toastr.error('Opps ha ocurrido un error', error.erros.message);
        console.log(error);
      },
      complete: () => {
        this._inventorySapXstoreApstate.state.isLoadingList = false;
      },
    });
  }
  handleDownload() {}
  handleFavorite() {}
}
