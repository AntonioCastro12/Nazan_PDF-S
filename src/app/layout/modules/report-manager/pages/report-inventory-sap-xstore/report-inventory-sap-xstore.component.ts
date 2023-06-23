import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonStateService } from '../../services/common-state.service';
import { Store } from '../../models/store.model';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import { inventorySapXstoreLabels } from '../../models/report.entity';
import { objectContainsValue, highlightSearchText, ID_DATA_NAME, addIdToData, formatArrayValues } from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';

@Component({
  selector: 'app-report-inventory-sap-xstore',
  templateUrl: './report-inventory-sap-xstore.component.html',
  styleUrls: ['./report-inventory-sap-xstore.component.scss'],
  providers: [
    HttpClient
  ]
})
export class ReportInventorySapXtoreComponent {
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
  inventorySapXstoreLabels = inventorySapXstoreLabels;
  filter: string = '';
  subscription: any = {};
  optionsState: any = {};
  highlightSearchText = highlightSearchText;
  lastOptionsEntity: OptionsEntity = { onChart: false, onDownload: false, onRefresh: false, onSearch: false, onShow: false };

  constructor(
    public _optionServices: OptionsStateService,
    private _reportApiService: ReportApiService,
    public reportState: ReportStateService,
    public commonState: CommonStateService,
    public _excelService: ExcelService,
  ) {
    _optionServices.initState()
  }
  ngOnInit() {
    this.getList()
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

  getList() {
    this.isLoading = true;
    this._reportApiService.inventorySapXstore(this.filter).subscribe({
      next: (data) => {
        this.reportState.reportState.inventory.sapXstore.list = { data, total: data.length }

        const dataOriginal = addIdToData(data);
        this.reportState.reportState.inventory.sapXstore.original = { data: dataOriginal, total: dataOriginal.length }
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {});
        this.reportState.reportState.inventory.sapXstore.list = { data: dataFormatted, total: dataFormatted.length }
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
    this.getList();
  }
  resetFilters() {
    this.selectedStore = null;
    this.selectedOrigin = '';
    this.filter = ''
  }

  handleSearchRecords() {
    const list = this.reportState.reportState.inventory.sapXstore.list.data;
    this.reportState.reportState.inventory.sapXstore.filter.data = list.filter((item) =>
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
    if (this.reportState.reportState.inventory.sapXstore.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list = this.reportState.reportState.inventory.sapXstore.filter.data.length > 0 ? this.reportState.reportState.inventory.sapXstore.filter.data : this.reportState.reportState.inventory.sapXstore.list.data
    const ids = list.map(item => item[ID_DATA_NAME])
    list = this.reportState.reportState.inventory.sapXstore.original.data.filter(item => {
      if (ids.includes(item[ID_DATA_NAME])) {
        return item
      }
    })
    const blob = await this._excelService.generateExcel(list);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${new Date().getTime()}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  }




}
