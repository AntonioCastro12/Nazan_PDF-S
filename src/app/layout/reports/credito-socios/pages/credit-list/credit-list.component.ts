import { Component } from '@angular/core';
import {
  CreditoApiService,
  CreditoStateService,
} from '../../services';
import { inventoryStockResumeResponseName, CustomerInformation } from '../../models';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent {

  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  inventoryStockResumeResponseName = inventoryStockResumeResponseName;

  customerInformation = CustomerInformation;

  searchText = '';
  isLoading: boolean = false;

  constructor(
    public _inventoryStockResume: CreditoStateService,
    public _inventoryStockResumeApi: CreditoApiService
  ) {}

  
  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  handleSearchRecords() {
    const list = this._inventoryStockResume.state.inventoryStockResumeResponse;
    this._inventoryStockResume.state.inventoryStockResumeResponseList =
      list.filter((item) => objectContainsValue(item, this.searchText));

    console.log("Filter: ",this._inventoryStockResume.state.inventoryStockResumeResponseList);
          
  }

  async findDetails() {
    this.isLoading = true;
    this._inventoryStockResumeApi
      .inventoryStockDetails(
        this._inventoryStockResume.state.inventoryStockResumeDTO
      )
      .subscribe({
        next: (data) => {
          this._inventoryStockResume.state.inventoryStockDetailResponse = data;
          this._inventoryStockResume.state.inventoryStockDetailResponseList =
            data;
        },
        error: (e) => {
          console.error('error loading data', e);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  async showDetails() {
    this._inventoryStockResume.state.isVisibleModal = true;
  }

}
