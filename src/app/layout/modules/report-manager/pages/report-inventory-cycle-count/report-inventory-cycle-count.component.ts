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
import { ReportsExcelNames, inventoryCycleCountLabels } from '../../models/report.entity';
import { ID_DATA_NAME, addIdToData, formatArrayValues, highlightSearchText, objectContainsValue } from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';
import { AuthStateService } from '../../../auth-manager/services/auth-state.service';
import { DateTime } from 'luxon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-inventory-cycle-count',
  templateUrl: './report-inventory-cycle-count.component.html',
  styleUrls: ['./report-inventory-cycle-count.component.scss'],
  providers: [
    HttpClient
  ]
})
export class ReportInventoryCycleCountComponent {
  searchText: string = "";
  selectedCountType!: string;
  selectedStore: Store[] | null = null;
  selectedOrigin: string = '';
  suggestions: Store[] = [];
  isLoading: boolean = false;
  showModal: boolean = false;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';
  showDetail: boolean = false;
  from: Date = new Date();
  to: Date = new Date();
  countTypeList: any[] = [{ name: 'Contador de Cíclos', id: "CYCLE_COUNT" }, { name: 'Conteo Físico', id: "PHYSICAL_COUNT" }];
  searchFormEntityLabels = searchFormEntityLabels;
  inventoryCycleCountLabels = inventoryCycleCountLabels;
  filter: string = '';
  subscription: any = {};
  optionsState: any = {};
  highlightSearchText = highlightSearchText;
  lastOptionsEntity: OptionsEntity = { onChart: false, onDownload: false, onRefresh: false, onSearch: false, onShow: false, onFavorite: false };

  constructor(
    public _optionServices: OptionsStateService,
    private _reportApiService: ReportApiService,
    private _commonApiService: CommonApiService,
    public reportState: ReportStateService,
    public commonState: CommonStateService,
    public _excelService: ExcelService,
    public authStateService: AuthStateService,
    private route: ActivatedRoute
  ) {
    this.authStateService.loadUserInfo()
    this._optionServices.initState()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.reportState.reportState.inventory.cycleCount.list.data = []
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
        this.lastOptionsEntity = { onChart, onDownload, onRefresh, onSearch, onShow, onFavorite };
      }
    });
    this.getStores().then(() => {
      if (this.route.snapshot.queryParamMap.get('favorite')) {
        const report: any = this.commonState.commonState.favorites.find(item => item.url === '/inventories/cycle-count')
        if (report) {
          const selectedStore = this.commonState.commonState.stores.filter(item => report.searchCriteria.storeId.split(',').includes(item.storeInfoId))
          const selectedCountType = this.countTypeList.find(item => item.id === report.searchCriteria.type)
          this.selectedStore = selectedStore || null;
          this.selectedCountType = selectedCountType.id || null;
          this.from = new Date(report.searchCriteria.startDate)
          this.to = new Date(report.searchCriteria.endDate)
          this.lastOptionsEntity.onSearch === false ? this._optionServices.setSearch() : null
          this.handleSearch()
        }
      }
    })
  }

  handleFavorite() {
    this.isLoading = true
    const data = {
      searchCriteria: {
        storeId: this.selectedStore?.map(item => item.storeInfoId).join(','),
        type: this.selectedCountType,
        startDate: DateTime.fromJSDate(new Date(this.from)).toFormat('yyyy-MM-dd'),
        endDate: DateTime.fromJSDate(new Date(this.to)).toFormat('yyyy-MM-dd')
      },
      url: "/inventories/cycle-count"
    }

    this._reportApiService.favorite(data).
      subscribe({
        next: async () => {
          await this.setErrorModal('Completado', 'Reporte agregado a favorito', '50px');
          this.isLoading = false
        },
        error: (e) => {
          console.log('error loading data', e)
          this.isLoading = false
        },
        complete: () => {
        }
      })
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


  getStores(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._commonApiService.getStores().
        subscribe({
          next: (data) => {
            this.commonState.commonState.stores = data
            resolve();
          },
          error: (e) => {
            console.log('error loading data', e)
            reject();
          },
          complete: () => {
            resolve();
          }
        })
    });
  }
  getList() {
    this.isLoading = true;
    this._reportApiService.inventoryCycleCount(this.filter).subscribe({
      next: (data) => {
        this.reportState.reportState.inventory.cycleCount.list = { data, total: data.length }
        const dataOriginal = addIdToData(data);
        this.reportState.reportState.inventory.cycleCount.original = { data: dataOriginal, total: dataOriginal.length }
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {
          FECHA_INICIAL: { type: 'date', format: 'dd-MM-yyyy' },
          FECHA_FINAL: { type: 'date', format: 'dd-MM-yyyy' },
          CANT_ITEMS: { type: 'number', format: 'currency' },
        });
        this.reportState.reportState.inventory.cycleCount.list = { data: dataFormatted, total: dataFormatted.length }
      },
      error: (e) => {
        console.log('error loading data', e)
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  async onSelectRange() {
    let diffDays = 0;
    if (this.from && this.to)
      diffDays = DateTime.fromJSDate(this.to).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .diff(DateTime.fromJSDate(this.from).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }), 'days').days;
    if (diffDays > 90) {
      await this.setErrorModal('Error', 'El rango supera el limite de 90 dias', '50px');
    }
    if (diffDays < 0) {
      await this.setErrorModal('Error', 'La fecha final no puede ser menor a la fecha final', '50px');
    }
  }

  async handleSearch() {
    console.log(this.selectedStore, this.selectedCountType)
    if (this.selectedStore === null || typeof this.selectedStore !== 'object' || this.selectedCountType === undefined) {
      await this.setErrorModal('Error', 'Debe completar los datos del formulario de busqueda', '50px');
      return;
    }
    this.filter = `?storeId=${this.selectedStore?.map(item => item.storeInfoId).join(',')}&startDate=${DateTime.fromJSDate(new Date(this.from)).toFormat('yyyy-MM-dd')}&endDate=${DateTime.fromJSDate(new Date(this.to)).toFormat('yyyy-MM-dd')}&type=${this.selectedCountType}`

    this.getList();
  }
  resetFilters() {
    this.selectedStore = null;
    this.selectedOrigin = '';
    this.filter = ''
  }

  handleSearchRecords() {
    const list = this.reportState.reportState.inventory.cycleCount.list.data;
    this.reportState.reportState.inventory.cycleCount.filter.data = list.filter((item) =>
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
    if (this.reportState.reportState.inventory.cycleCount.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list = this.reportState.reportState.inventory.cycleCount.filter.data.length > 0 ? this.reportState.reportState.inventory.comparison.filter.data : this.reportState.reportState.inventory.cycleCount.list.data
    const ids = list.map(item => item[ID_DATA_NAME])
    list = this.reportState.reportState.inventory.cycleCount.original.data.filter(item => {
      if (ids.includes(item[ID_DATA_NAME])) {
        return item
      }
    })

    const blob = await this._excelService.generateExcel(list);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${ReportsExcelNames.CUMPLIMIENTO_CONTEOS_CICLICOS_}${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }




}
