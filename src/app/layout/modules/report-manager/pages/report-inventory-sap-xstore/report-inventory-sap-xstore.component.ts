import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonStateService } from '../../services/common-state.service';
import { Store } from '../../models/store.model';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import {
  ReportsExcelNames,
  inventorySapXstoreLabels,
} from '../../models/report.entity';
import {
  objectContainsValue,
  highlightSearchText,
  ID_DATA_NAME,
  addIdToData,
  formatArrayValues,
} from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';
import { DateTime } from 'luxon';
import { AuthStateService } from '../../../auth-manager/services/auth-state.service';
import { ActivatedRoute } from '@angular/router';
import { LayoutStateService } from 'src/app/layout/config/layout-manager';

@Component({
  selector: 'app-report-inventory-sap-xstore',
  templateUrl: './report-inventory-sap-xstore.component.html',
  styleUrls: ['./report-inventory-sap-xstore.component.scss'],
  providers: [HttpClient],
})
export class ReportInventorySapXtoreComponent {
  searchText: string = '';
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
  originList: any[] = [
    { name: 'xStore', id: 'xstore' },
    { name: 'xCenter', id: 'xcenter' },
  ];
  searchFormEntityLabels = searchFormEntityLabels;
  inventorySapXstoreLabels = inventorySapXstoreLabels;
  filter: string = '';
  subscription: any = {};
  optionsState: any = {};
  highlightSearchText = highlightSearchText;
  lastOptionsEntity: OptionsEntity = {
    onChart: false,
    onDownload: false,
    onRefresh: false,
    onSearch: false,
    onShow: false,
    onFavorite: false,
  };

  layoutState;

  constructor(
    public _optionServices: OptionsStateService,
    private _reportApiService: ReportApiService,
    public reportState: ReportStateService,
    public commonState: CommonStateService,
    public _excelService: ExcelService,
    public authStateService: AuthStateService,
    private route: ActivatedRoute,
    private layoutStateService: LayoutStateService
  ) {
    this.authStateService.loadUserInfo();
    _optionServices.initState();
    this.layoutState = this.layoutStateService.layoutState;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
    this.layoutState.config.layoutConfig.sidebarActive = false;
    this.reportState.reportState.inventory.sapXstore.list.data = [];
    // this.getList();
    this.subscription = this._optionServices.state.subscribe((optionsState) => {
      if (optionsState.OptionsEntity !== this.lastOptionsEntity) {
        const { onChart, onDownload, onRefresh, onSearch, onShow, onFavorite } =
          optionsState.OptionsEntity;
        if (onRefresh !== this.lastOptionsEntity.onRefresh) {
          this.handleSearch();
        }
        if (onDownload !== this.lastOptionsEntity.onDownload) {
          this.exportExcel();
        }
        if (onFavorite !== this.lastOptionsEntity.onFavorite) {
          this.handleFavorite();
        }
        this.lastOptionsEntity = {
          onChart,
          onDownload,
          onRefresh,
          onSearch,
          onShow,
          onFavorite,
        };
      }
    });
    if (
      this.route.snapshot.queryParamMap.get('favorite') ||
      this.route.snapshot.queryParamMap.get('historic')
    ) {
      const report: any = this.route.snapshot.queryParamMap.get('favorite')
        ? this.commonState.commonState.favorites.find(
            (item) => item.url === '/inventories/sap-xstore'
          )
        : this.commonState.commonState.historic.find(
            (item) =>
              item.index ===
              Number(this.route.snapshot.queryParamMap.get('index'))
          );
      if (report) {
        const selectedStore = this.commonState.commonState.stores.find(
          (item) => item.storeInfoId === report.searchCriteria.storeId
        );
        this.selectedStore = selectedStore || null;
        this._optionServices.setSearch();
        this.handleSearch();
      }
    }
  }

  handleFavorite() {
    this.isLoading = true;
    const data = {
      searchCriteria: {
        storeId: this.selectedStore?.storeInfoId,
      },
      url: '/inventories/sap-xstore',
    };

    this._reportApiService.favorite(data).subscribe({
      next: async () => {
        await this.setErrorModal(
          'Completado',
          'Reporte agregado a favorito',
          '50px'
        );
        this.isLoading = false;
      },
      error: (e) => {
        console.log('error loading data', e);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  filterStores(event: { query: string }) {
    const filteredStores: Store[] = [];
    const storeList: Store[] = [];
    const userRol =
      this.authStateService.stateTemp.userInfo.privileges
        .reportesadministrativos;
    const userStore = this.authStateService.stateTemp.userInfo.tienda;

    if (userRol.includes('staff-menudeo')) {
      const temp = this.commonState.commonState.stores.filter(
        (x) => x.storeInfoType === 'R'
      );
      storeList.push(...temp);
    } else if (userRol.includes('staff-mayoreo')) {
      const temp = this.commonState.commonState.stores.filter(
        (x) => x.storeInfoType === 'W'
      );
      storeList.push(...temp);
    } else {
      storeList.push(...this.commonState.commonState.stores);
    }

    for (const store of storeList) {
      if (
        store.storeInfoName.toLowerCase().includes(event.query.toLowerCase())
      ) {
        filteredStores.push(store);
      }
    }
    this.suggestions = filteredStores;
  }

  getList() {
    this.isLoading = true;
    this._reportApiService.inventorySapXstore(this.filter).subscribe({
      next: (data) => {
        this.reportState.reportState.inventory.sapXstore.list = {
          data,
          total: data.length,
        };

        const dataOriginal = addIdToData(data);
        this.reportState.reportState.inventory.sapXstore.original = {
          data: dataOriginal,
          total: dataOriginal.length,
        };
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {});
        this.reportState.reportState.inventory.sapXstore.list = {
          data: dataFormatted,
          total: dataFormatted.length,
        };
      },
      error: (e) => {
        console.log('error loading data', e);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  async handleSearch() {
    this.getList();
  }
  resetFilters() {
    this.selectedStore = null;
    this.selectedOrigin = '';
    this.filter = '';
  }

  handleSearchRecords() {
    const list = this.reportState.reportState.inventory.sapXstore.list.data;
    this.reportState.reportState.inventory.sapXstore.filter.data = list.filter(
      (item) => objectContainsValue(item, this.searchText)
    );
  }

  async setErrorModal(title: string, text: string, width: string) {
    this.titleModal = title;
    this.textModal = text;
    this.widthModal = width;
    this.showModal = true;
  }

  async exportExcel() {
    if (
      this.reportState.reportState.inventory.sapXstore.list.data.length <= 0
    ) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list =
      this.reportState.reportState.inventory.sapXstore.filter.data.length > 0
        ? this.reportState.reportState.inventory.sapXstore.filter.data
        : this.reportState.reportState.inventory.sapXstore.list.data;
    const ids = list.map((item) => item[ID_DATA_NAME]);
    list =
      this.reportState.reportState.inventory.sapXstore.original.data.filter(
        (item) => {
          if (ids.includes(item[ID_DATA_NAME])) {
            return item;
          }
        }
      );
    const blob = await this._excelService.generateExcel(list);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${
      ReportsExcelNames.DIFERENCIA_DE_INVENTARIO_SAP_VS_XSTORE_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
