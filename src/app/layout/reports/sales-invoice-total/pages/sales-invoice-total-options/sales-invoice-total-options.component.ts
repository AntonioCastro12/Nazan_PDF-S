import { Component } from '@angular/core';
import {
  SalesInvoiceTotalApiService,
  SalesInvoiceTotalStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sales-invoice-total-options',
  templateUrl: './sales-invoice-total-options.component.html',
  styleUrls: ['./sales-invoice-total-options.component.scss'],
})
export class SalesInvoiceTotalOptionsComponent {
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
    public _salesInvoiceTotal: SalesInvoiceTotalStateService,
    private _salesInvoiceTotalApi: SalesInvoiceTotalApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._salesInvoiceTotal.state.isVisibleForm =
      !this._salesInvoiceTotal.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._salesInvoiceTotal.state.isLoadingList = true;

    this._salesInvoiceTotalApi
      .inventoryKardexProduct(
        this._salesInvoiceTotal.state.salesInvoiceTotalDTO
      )
      .subscribe({
        next: (data) => {
          this._salesInvoiceTotal.state.salesInvoiceTotalResponse = data;
          this._salesInvoiceTotal.state.salesInvoiceTotalResponseList = data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.log(error);
        },
        complete: () => {
          this._salesInvoiceTotal.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}
