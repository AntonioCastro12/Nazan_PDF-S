import { Component } from '@angular/core';
import { salesWholesaleResponseName } from '../../models';
import { SalesWholesaleStateService } from '../../services';

@Component({
  selector: 'sales-wholesale-list',
  templateUrl: './sales-wholesale-list.component.html',
  styleUrls: ['./sales-wholesale-list.component.scss'],
})
export class SalesWholesaleListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  salesWholesaleResponseName = salesWholesaleResponseName;

  searchText = '';

  constructor(public _salesWholesale: SalesWholesaleStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
