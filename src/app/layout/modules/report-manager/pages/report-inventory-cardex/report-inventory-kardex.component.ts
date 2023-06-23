import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { DateTime } from 'luxon';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonApiService } from '../../services/common-api.service';
import { CommonStateService } from '../../services/common-state.service';
import { Store } from '../../models/store.model';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import { ReportsExcelNames, inventoryKardexLabels } from '../../models/report.entity';
import { objectContainsValue, highlightSearchText, addIdToData, formatArrayValues, ID_DATA_NAME } from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';

@Component({
  selector: 'app-report-inventory-kardex',
  templateUrl: './report-inventory-kardex.component.html',
  styleUrls: ['./report-inventory-kardex.component.scss'],
  providers: [
    HttpClient
  ]
})
export class ReportInventoryKardexComponent {
  searchText: string = "";
  selectedStatus!: string;
  selectedStore: Store | null = null;
  selectedOrigin: string = '';
  suggestions: Store[] = [];
  isLoading: boolean = false;
  showModal: boolean = false;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';
  showDetail: boolean = false;
  originList: any[] = [{ name: 'xStore', id: "xstore" }, { name: 'xCenter', id: "xcenter" }];
  searchFormEntityLabels = searchFormEntityLabels;
  inventoryKardexLabels = inventoryKardexLabels;
  productCode: string = '';
  from: Date = new Date();
  to: Date = new Date();
  filter: string = '';
  subscription: any = {};
  optionsState: any = {};
  highlightSearchText = highlightSearchText;
  lastOptionsEntity: OptionsEntity = { onChart: false, onDownload: false, onRefresh: false, onSearch: false, onShow: false };

  constructor(
    public _optionServices: OptionsStateService,
    private _reportApiService: ReportApiService,
    private _commonApiService: CommonApiService,
    public reportState: ReportStateService,
    public commonState: CommonStateService,
    public _excelService: ExcelService,
  ) {
    _optionServices.initState()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
    this.getStores()
    this.subscription = this._optionServices.state.subscribe((optionsState) => {
      if (optionsState.OptionsEntity !== this.lastOptionsEntity) {
        const { onChart, onDownload, onRefresh, onSearch, onShow } =
          optionsState.OptionsEntity;
        if (onRefresh !== this.lastOptionsEntity.onRefresh) {
          this.handleSearch();
        }
        if (onDownload !== this.lastOptionsEntity.onDownload) {
          this.exportExcel();
        }
        this.lastOptionsEntity = { onChart, onDownload, onRefresh, onSearch, onShow };
      }
    });
  }

  filterStores(event: { query: string }) {
    const filteredStores: Store[] = [];
    for (const store of this.commonState.commonState.stores) {
      if (store.storeInfoName.toLowerCase().includes(event.query.toLowerCase())) {
        filteredStores.push(store);
      }
    }
    this.suggestions = filteredStores;
  }

  getStores() {
    this._commonApiService.getStores().
      subscribe({
        next: (data) => {
          this.commonState.commonState.stores = data
        },
        error: (e) => {
          console.log('error loading data', e)
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }
  getList() {
    this.reportState.reportState.inventory.kardex.list.data = []
    this.isLoading = true;
    this._reportApiService.inventoryKardexProduct(this.filter).subscribe({
      next: (data) => {
        const dataOriginal = addIdToData(data);
        this.reportState.reportState.inventory.kardex.original = { data: dataOriginal, total: dataOriginal.length }
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {
          create_date: { type: 'date', format: 'dd-MM-yyyy HH:mm:ss' },
        });
        this.reportState.reportState.inventory.kardex.list = { data: dataFormatted, total: dataFormatted.length }
      },
      error: (e) => {
        console.log('error loading data', e)
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  async handleSearch() {
    if (this.selectedStore === null || typeof this.selectedStore === 'string' || this.productCode === "" || this.selectedOrigin === "") {
      await this.setErrorModal('Error', 'Debe completar los datos del formulario de busqueda', '50px');
      return;
    }
    this.filter = `?storeId=${this.selectedStore?.storeInfoId}&productId=${this.productCode}&origin=${this.selectedOrigin}&startDate=${DateTime.fromJSDate(new Date(this.from)).toFormat('yyyy-MM-dd')}&endDate=${DateTime.fromJSDate(new Date(this.to)).toFormat('yyyy-MM-dd')}`
    this.getList();
  }
  resetFilters() {
    this.selectedStore = null;
    this.selectedOrigin = '';
    this.productCode = '';
    this.from = new Date();
    this.to = new Date();
    this.filter = ''
  }

  handleSearchRecords() {
    const list = this.reportState.reportState.inventory.kardex.list.data;
    this.reportState.reportState.inventory.kardex.filter.data = list.filter((item) =>
      objectContainsValue(item, this.searchText)
    );
  }

  async setErrorModal(title: string, text: string, width: string) {
    this.titleModal = title;
    this.textModal = text;
    this.widthModal = width;
    this.showModal = true;
  }

  async exportExcel() {
    if (this.reportState.reportState.inventory.kardex.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list = this.reportState.reportState.inventory.kardex.filter.data.length > 0 ? this.reportState.reportState.inventory.kardex.filter.data : this.reportState.reportState.inventory.kardex.list.data
    const ids = list.map(item => item[ID_DATA_NAME])
    list = this.reportState.reportState.inventory.kardex.original.data.filter(item => {
      if (ids.includes(item[ID_DATA_NAME])) {
        return item
      }
    })
    const blob = await this._excelService.generateExcel(list);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${ReportsExcelNames.KARDEX_DE_ARTICULO_}${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  }
}
