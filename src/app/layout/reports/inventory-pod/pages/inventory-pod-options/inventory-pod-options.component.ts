import { Component } from '@angular/core';
import {
  InventoryPodApiService,
  InventoryPodStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-pod-options',
  templateUrl: './inventory-pod-options.component.html',
  styleUrls: ['./inventory-pod-options.component.scss'],
})
export class InventoryPodOptionsComponent {
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
    public _inventoryPod: InventoryPodStateService,
    private _inventoryPodApi: InventoryPodApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._inventoryPod.state.isVisibleForm =
      !this._inventoryPod.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._inventoryPod.state.isLoadingList = true;

    this._inventoryPodApi
      .inventoryPod(this._inventoryPod.state.inventoryPodDTO)
      .subscribe({
        next: (data) => {
          this._inventoryPod.state.inventoryPodResponse = data;
          this._inventoryPod.state.inventoryPodResponseList = data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.log(error);
        },
        complete: () => {
          this._inventoryPod.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}
