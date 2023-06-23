import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonApiService } from '../../services/common-api.service';
import { CommonStateService } from '../../services/common-state.service';
import { Store } from '../../models/store.model';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import { inventoryStockResumeLabels, inventoryStockDetailLabels, ReportsExcelNames } from '../../models/report.entity';
import { objectContainsValue, highlightSearchText, addIdToData, formatArrayValues, ID_DATA_NAME } from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-report-inventory-stock-resume',
  templateUrl: './report-inventory-stock-resume.component.html',
  styleUrls: ['./report-inventory-stock-resume.component.scss'],
  providers: [
    HttpClient
  ]
})
export class ReportInventoryStockResumeComponent {
  searchText: string = "";
  searchTextDetails: string = "";
  selectedStatus!: string;
  selectedStore: Store | null = null;
  suggestions: Store[] = [];
  isLoading: boolean = false;
  showModal: boolean = false;
  showDetailsModal: boolean = false;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';
  showDetail: boolean = false;
  originList: any[] = [{ name: 'xStore', id: "xstore" }, { name: 'xCenter', id: "xcenter" }];
  searchFormEntityLabels = searchFormEntityLabels;
  inventoryStockResumeLabels = inventoryStockResumeLabels;
  inventoryStockDetailLabels = inventoryStockDetailLabels;
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
    this.showDetailsModal = false
    this.isLoading = true;
    this._reportApiService.inventoryStockResume(this.filter).subscribe({
      next: (data) => {
        const dataOriginal = addIdToData(data);
        this.reportState.reportState.inventory.stockResume.original = { data: dataOriginal, total: dataOriginal.length }
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {});
        this.reportState.reportState.inventory.stockResume.list = { data: dataFormatted, total: dataFormatted.length }
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

    if (this.selectedStore === null || typeof this.selectedStore === 'string') {
      await this.setErrorModal('Error', 'Debe completar los datos del formulario de busqueda', '50px');
      return;
    }
    this.filter = `?storeId=${this.selectedStore?.storeInfoId}`
    this.getList();
  }
  resetFilters() {
    this.selectedStore = null;
    this.filter = ''
  }

  handleSearchRecords() {
    const list = this.reportState.reportState.inventory.stockResume.list.data;
    this.reportState.reportState.inventory.stockResume.filter.data = list.filter((item) =>
      objectContainsValue(item, this.searchText)
    );
  }

  async findDetails() {
    this.isLoading = true;
    this._reportApiService.inventoryStockDetails(this.filter).subscribe({
      next: (data) => {
        this.reportState.reportState.inventory.stockResume.details = data
      },
      error: (e) => {
        console.log('error loading data', e)
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  async showDetails() {
    this.showDetailsModal = true
  }
  async setErrorModal(title: string, text: string, width: string) {
    this.titleModal = title;
    this.textModal = text;
    this.widthModal = width;
    this.showModal = true;
  }

  async exportDetailsExcel() {
    if (this.reportState.reportState.inventory.stockResume.details.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list = this.reportState.reportState.inventory.stockResume.details
    const blob = await this._excelService.generateExcel(list);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${ReportsExcelNames.EXISTENCIA_DE_INVENTARIO_DETALLE_}${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  }
  async exportExcel() {
    if (this.reportState.reportState.inventory.stockResume.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list = this.reportState.reportState.inventory.stockResume.filter.data.length > 0 ? this.reportState.reportState.inventory.stockResume.filter.data : this.reportState.reportState.inventory.stockResume.list.data
    const ids = list.map(item => item[ID_DATA_NAME])
    list = this.reportState.reportState.inventory.stockResume.original.data.filter(item => {
      if (ids.includes(item[ID_DATA_NAME])) {
        return item
      }
    })
    const blob = await this._excelService.generateExcel(list);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${ReportsExcelNames.EXISTENCIA_DE_INVENTARIO_RESUMEN_}${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

}
