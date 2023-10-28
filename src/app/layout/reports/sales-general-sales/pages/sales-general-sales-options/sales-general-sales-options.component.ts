import { Component } from '@angular/core';
import { SalesGeneralSalesApiService, SalesGeneralSalesStateService } from '../../services';

@Component({
  selector: 'sales-general-sales-options',
  templateUrl: './sales-general-sales-options.component.html',
  styleUrls: ['./sales-general-sales-options.component.scss'],
})
export class SalesGeneralSalesOptionsComponent {
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
    public _salesGeneralSales: SalesGeneralSalesStateService,
    private _salesGeneralSalesApi: SalesGeneralSalesApiService
  ) {}

  handleSearch() {
    this._salesGeneralSales.state.isVisibleForm =
      !this._salesGeneralSales.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._salesGeneralSales.state.isLoadingList = true;

    this._salesGeneralSalesApi
      .inventoryKardexProduct(this._salesGeneralSales.state.salesGeneralSalesDTO)
      .subscribe({
        next: (data) => {
          this._salesGeneralSales.state.salesGeneralSalesResponse = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._salesGeneralSales.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}
