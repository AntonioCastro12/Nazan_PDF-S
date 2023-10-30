import { Component } from '@angular/core';
import {
  SalesWholesaleApiService,
  SalesWholesaleStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sales-wholesale-options',
  templateUrl: './sales-wholesale-options.component.html',
  styleUrls: ['./sales-wholesale-options.component.scss'],
})
export class SalesWholesaleOptionsComponent {
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
    public _salesWholesale: SalesWholesaleStateService,
    private _salesWholesaleApi: SalesWholesaleApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._salesWholesale.state.isVisibleForm =
      !this._salesWholesale.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._salesWholesale.state.isLoadingList = true;

    this._salesWholesaleApi
      .inventoryKardexProduct(this._salesWholesale.state.salesWholesaleDTO)
      .subscribe({
        next: (data) => {
          this._salesWholesale.state.salesWholesaleResponse = data;
          this._salesWholesale.state.salesWholesaleResponseList = data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.log(error);
        },
        complete: () => {
          this._salesWholesale.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}
