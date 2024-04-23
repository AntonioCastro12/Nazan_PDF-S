import { Component } from '@angular/core';
import { SalesSearchDeliveredStateService } from '../../services';
import { SalesSearchDeliveredResponseName } from '../../models';
import { objectContainsValue, unicodeToChar } from '@shared/functions';

@Component({
  selector: 'sales-search-delivered-list',
  templateUrl: './sales-search-delivered-list.component.html',
  styleUrls: ['./sales-search-delivered-list.component.scss'],
})
export class SalesSearchDeliveredListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
    headerSales: 'Ventas',
    headerPayForms: 'Formas de pago',
  };

  SalesSearchDeliveredResponseName = SalesSearchDeliveredResponseName;

  searchText = '';

  constructor(public _salesSearchDelivered: SalesSearchDeliveredStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  handleSearchRecords() {
    const list = this._salesSearchDelivered.state.SalesSearchDeliveredResponse;
    this._salesSearchDelivered.state.SalesSearchDeliveredResponseSalesList =
      list.filter((item) => objectContainsValue(item, this.searchText));
  }

  handleSearchRecordsPayment() {
    const list =
      this._salesSearchDelivered.state.SalesSearchDeliveredResponsePayFormsList;
    this._salesSearchDelivered.state.SalesSearchDeliveredResponsePayFormsList =
      list.filter((item) => objectContainsValue(item, this.searchText));
  }

  onConvertUnicodeText(text: string) {
    return unicodeToChar(text);
  }
}
