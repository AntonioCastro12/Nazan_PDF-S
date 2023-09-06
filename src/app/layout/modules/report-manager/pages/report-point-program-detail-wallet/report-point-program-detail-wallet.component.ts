import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { DateTime } from 'luxon';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonStateService } from '../../services/common-state.service';
import { Store } from '../../models/store.model';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import { ReportsExcelNames, pointProgramDetailWallet } from '../../models/report.entity';
import { objectContainsValue, highlightSearchText, ID_DATA_NAME, addIdToData, formatArrayValues } from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';
import { AuthStateService } from '../../../auth-manager/services/auth-state.service';

@Component({
  selector: 'app-report-point-program-detail-wallet',
  templateUrl: './report-point-program-detail-wallet.component.html',
  styleUrls: ['./report-point-program-detail-wallet.component.scss'],
  providers: [
    HttpClient
  ]
})
export class ReportPointProgramDetailWalletComponent {
  allowSearch: boolean = true;
  searchText: string = "";
  suggestions: Store[] = [];
  isLoading: boolean = false;
  showModal: boolean = false;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';
  showDetail: boolean = false;
  searchFormEntityLabels = searchFormEntityLabels;
  pointProgramDetailWallet = pointProgramDetailWallet;
  from: Date = new Date();
  to: Date = new Date();
  filter: string = '';
  subscription: any = {};
  optionsState: any = {};
  highlightSearchText = highlightSearchText;
  lastOptionsEntity: OptionsEntity = { onChart: false, onDownload: false, onRefresh: false, onSearch: false, onShow: false, onFavorite: false };

  constructor(
    public _optionServices: OptionsStateService,
    private _reportApiService: ReportApiService,
    public reportState: ReportStateService,
    public commonState: CommonStateService,
    public _excelService: ExcelService,
    public authStateService: AuthStateService
  ) {
    this.authStateService.loadUserInfo()
    _optionServices.initState()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
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
        this.lastOptionsEntity = { onChart, onDownload, onRefresh, onSearch, onShow, onFavorite };
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
    this.reportState.reportState.pointProgram.detailWallet.list.data = []
    this.isLoading = true;
    this._reportApiService.pointProgramDetailWallet(this.filter).subscribe({
      next: (data) => {
        const dataOriginal = addIdToData(data);
        this.reportState.reportState.pointProgram.detailWallet.original = { data: dataOriginal, total: dataOriginal.length }
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {
          "FECHA ACTIVIDAD": { type: 'date', format: 'dd-MM-yyyy' },
        });
        this.reportState.reportState.pointProgram.detailWallet.list = { data: dataFormatted, total: dataFormatted.length }
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
    this.filter = `?startDate=${DateTime.fromJSDate(new Date(this.from)).toFormat('yyyy-MM-dd')}&endDate=${DateTime.fromJSDate(new Date(this.to)).toFormat('yyyy-MM-dd')}`
    this.getList();
  }
  resetFilters() {
    this.from = new Date();
    this.to = new Date();
    this.filter = ''
  }

  handleSearchRecords() {
    const list = this.reportState.reportState.pointProgram.detailWallet.list.data;
    this.reportState.reportState.pointProgram.detailWallet.filter.data = list.filter((item) =>
      objectContainsValue(item, this.searchText)
    );
  }

  async setErrorModal(title: string, text: string, width: string) {
    this.titleModal = title;
    this.textModal = text;
    this.widthModal = width;
    this.showModal = true;
  }

  checkRange() {
    return DateTime.fromJSDate(this.to)
      .diff(DateTime.fromJSDate(this.from).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }), 'days').days > 90 || DateTime.fromJSDate(this.to)
        .diff(DateTime.fromJSDate(this.from).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }), 'days').days < 0;
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

  async exportExcel() {
    if (this.reportState.reportState.pointProgram.detailWallet.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list = this.reportState.reportState.pointProgram.detailWallet.filter.data.length > 0 ? this.reportState.reportState.pointProgram.detailWallet.filter.data : this.reportState.reportState.pointProgram.detailWallet.list.data
    const ids = list.map(item => item[ID_DATA_NAME])
    list = this.reportState.reportState.pointProgram.detailWallet.original.data.filter(item => {
      if (ids.includes(item[ID_DATA_NAME])) {
        return item
      }
    })
    const blob = await this._excelService.generateExcel(list);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${ReportsExcelNames.REPORTE_DETALLE_MOVIMIENTOS_MONEDERO_}${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  }




}
