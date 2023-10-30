import { Component } from '@angular/core';
import { SalesGeneralSalesStateService } from '../../services';
import { salesGeneralSalesResponseName } from '../../models';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'sales-general-sales-list',
  templateUrl: './sales-general-sales-list.component.html',
  styleUrls: ['./sales-general-sales-list.component.scss'],
})
export class SalesGeneralSalesListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
    headerSales: 'Ventas',
    headerPayForms: 'Formas de pago',
  };

  salesGeneralSalesResponseName = salesGeneralSalesResponseName;

  searchText = '';

  constructor(public _salesGeneralSales: SalesGeneralSalesStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  handleSearchRecords() {
    const list = this._salesGeneralSales.state.salesGeneralSalesResponse;
    this._salesGeneralSales.state.salesGeneralSalesResponseSalesList =
      list.filter((item) => objectContainsValue(item, this.searchText));
    this._salesGeneralSales.state.salesGeneralSalesResponsePayFormsList =
      list.filter((item) => objectContainsValue(item, this.searchText));
  }
}
