import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { DateTime } from 'luxon';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonStateService } from '../../services/common-state.service';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import {
  ReportsExcelNames,
  pointProgramTotalMovementLabels,
} from '../../models/report.entity';
import {
  objectContainsValue,
  highlightSearchText,
  ID_DATA_NAME,
  addIdToData,
  formatArrayValues,
} from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';
import { AuthStateService } from '../../../auth-manager/services/auth-state.service';
import { ActivatedRoute } from '@angular/router';
import { LayoutStateService } from 'src/app/layout/config/layout-manager';

@Component({
  selector: 'app-report-point-program-total-movement',
  templateUrl: './report-point-program-total-movement.component.html',
  styleUrls: ['./report-point-program-total-movement.component.scss'],
  providers: [HttpClient],
})
export class ReportPointProgramTotalMovementComponent {
  from: Date = new Date();
  to: Date = new Date();
  searchText: string = '';
  isLoading: boolean = false;
  showModal: boolean = false;
  allowSearch: boolean = true;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';
  showDetail: boolean = false;
  searchFormEntityLabels = searchFormEntityLabels;
  pointProgramTotalMovementLabels = pointProgramTotalMovementLabels;
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
    this.reportState.reportState.pointProgram.totalMovement.list.data = [];
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
            (item) => item.url === '/point-program/total-movement'
          )
        : this.commonState.commonState.historic.find(
            (item) =>
              item.index ===
              Number(this.route.snapshot.queryParamMap.get('index'))
          );
      if (report) {
        this.from = DateTime.fromISO(
          report.searchCriteria.startDate
        ).toJSDate();
        this.to = DateTime.fromISO(report.searchCriteria.endDate).toJSDate();
        this._optionServices.setSearch();
        this.handleSearch();
      }
    }
  }

  handleFavorite() {
    this.isLoading = true;
    const data = {
      searchCriteria: {
        startDate: DateTime.fromJSDate(new Date(this.from)).toFormat(
          'yyyy-MM-dd'
        ),
        endDate: DateTime.fromJSDate(new Date(this.to)).toFormat('yyyy-MM-dd'),
      },
      url: '/point-program/total-movement',
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

  getList() {
    this.reportState.reportState.pointProgram.totalMovement.list.data = [];
    this.isLoading = true;
    this._reportApiService.pointProgramTotalMovement(this.filter).subscribe({
      next: (data) => {
        const dataOriginal = addIdToData(data);
        this.reportState.reportState.pointProgram.totalMovement.original = {
          data: dataOriginal,
          total: dataOriginal.length,
        };
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {
          'FECHA ACTIVIDAD': { type: 'date', format: 'dd-MM-yyyy' },
        });
        this.reportState.reportState.pointProgram.totalMovement.list = {
          data: dataFormatted,
          total: dataFormatted.length,
        };
        this.isLoading = false;
      },
      error: (e) => {
        console.log('error loading data', e);
      },
      complete: () => {},
    });
  }

  async handleSearch() {
    this.filter = `?startDate=${DateTime.fromJSDate(
      new Date(this.from)
    ).toFormat('yyyy-MM-dd')}&endDate=${DateTime.fromJSDate(
      new Date(this.to)
    ).toFormat('yyyy-MM-dd')}`;
    this.getList();
  }
  resetFilters() {
    this.from = new Date();
    this.to = new Date();
    this.filter = '';
  }

  handleSearchRecords() {
    const list =
      this.reportState.reportState.pointProgram.totalMovement.list.data;
    this.reportState.reportState.pointProgram.totalMovement.filter.data =
      list.filter((item) => objectContainsValue(item, this.searchText));
  }

  async setErrorModal(title: string, text: string, width: string) {
    this.titleModal = title;
    this.textModal = text;
    this.widthModal = width;
    this.showModal = true;
  }

  checkRange() {
    return (
      DateTime.fromJSDate(this.to).diff(
        DateTime.fromJSDate(this.from).set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        }),
        'days'
      ).days > 90 ||
      DateTime.fromJSDate(this.to).diff(
        DateTime.fromJSDate(this.from).set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        }),
        'days'
      ).days < 0
    );
  }

  async onSelectRange() {
    let diffDays = 0;
    if (this.from && this.to)
      diffDays = DateTime.fromJSDate(this.to)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .diff(
          DateTime.fromJSDate(this.from).set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          }),
          'days'
        ).days;
    if (diffDays > 90) {
      await this.setErrorModal(
        'Error',
        'El rango supera el limite de 90 dias',
        '50px'
      );
    }
    if (diffDays < 0) {
      await this.setErrorModal(
        'Error',
        'La fecha final no puede ser menor a la fecha final',
        '50px'
      );
    }
  }

  async exportExcel() {
    if (
      this.reportState.reportState.pointProgram.totalMovement.list.data
        .length <= 0
    ) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list =
      this.reportState.reportState.pointProgram.totalMovement.filter.data
        .length > 0
        ? this.reportState.reportState.pointProgram.totalMovement.filter.data
        : this.reportState.reportState.pointProgram.totalMovement.list.data;
    const ids = list.map((item) => item[ID_DATA_NAME]);
    list =
      this.reportState.reportState.pointProgram.totalMovement.original.data.filter(
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
      ReportsExcelNames.REPORTE_TOTALES_MOVIMIENTO_PUNTOS_Y_MONEDERO_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
