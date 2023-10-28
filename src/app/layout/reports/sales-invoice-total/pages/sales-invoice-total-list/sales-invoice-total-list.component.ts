import { Component } from '@angular/core';
import { SalesInvoiceTotalStateService } from '../../services';
import { salesInvoiceTotalResponseName } from '../../models';

@Component({
  selector: 'sales-invoice-total-list',
  templateUrl: './sales-invoice-total-list.component.html',
  styleUrls: ['./sales-invoice-total-list.component.scss'],
})
export class SalesInvoiceTotalListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  salesInvoiceTotalResponseName = salesInvoiceTotalResponseName;

  searchText = '';

  constructor(public _salesInvoiceTotal: SalesInvoiceTotalStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
