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
import { pointProgramTotalMovementLabels } from '../../models/report.entity';
import { objectContainsValue, highlightSearchText } from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';

@Component({
  selector: 'app-report-point-program-total-movement',
  templateUrl: './report-point-program-total-movement.component.html',
  styleUrls: ['./report-point-program-total-movement.component.scss'],
  providers: [
    HttpClient
  ]
})
export class ReportPointProgramTotalMovementComponent {
  rangeDates: Array<any> = [
    DateTime.local().toJSDate(),
    DateTime.local().plus({ days: 1 }).toJSDate()
  ];
  searchText: string = "";
  isLoading: boolean = false;
  showModal: boolean = false;
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
  lastOptionsEntity: OptionsEntity = { onChart: false, onDownload: false, onRefresh: false, onSearch: false, onShow: false };

  constructor(
    public _optionServices: OptionsStateService,
    private _reportApiService: ReportApiService,
    public reportState: ReportStateService,
    public commonState: CommonStateService,
    public _excelService: ExcelService,
  ) {
  }
  ngOnInit() {
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

  getList() {
    this.reportState.reportState.pointProgram.totalMovement.list.data = []
    this.isLoading = true;
    this._reportApiService.pointProgramTotalMovement(this.filter).subscribe({
      next: (data) => {
        this.reportState.reportState.pointProgram.totalMovement.list = { data, total: data.length }
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
    this.filter = `?startDate=${DateTime.fromJSDate(new Date(this.rangeDates[0])).toFormat('yyyy-MM-dd')}&endDate=${DateTime.fromJSDate(new Date(this.rangeDates[1])).toFormat('yyyy-MM-dd')}`
    this.getList();
  }
  resetFilters() {
    this.rangeDates = [
      DateTime.local().toJSDate(),
      DateTime.local().plus({ days: 1 }).toJSDate()
    ];
    this.filter = ''
  }

  handleSearchRecords() {
    const list = this.reportState.reportState.pointProgram.totalMovement.list.data;
    this.reportState.reportState.pointProgram.totalMovement.filter.data = list.filter((item) =>
      objectContainsValue(item, this.searchText)
    );
  }

  async setErrorModal(title: string, text: string, width: string) {
    this.titleModal = title;
    this.textModal = text;
    this.widthModal = width;
    this.showModal = true;
  }

  onSelectRangeEnd(event: any): void {
    let diffDays = 0;
    if (this.rangeDates[0] && this.rangeDates[1])
      diffDays = DateTime.fromJSDate(this.rangeDates[1])
        .diff(DateTime.fromJSDate(this.rangeDates[0]), 'days').days;
    if (diffDays > 90) {
      const newDate = DateTime.fromJSDate(this.rangeDates[0]).plus({ days: 90 }).toJSDate();
      this.rangeDates[1] = newDate;
    }
  }

  async exportExcel() {
    if (this.reportState.reportState.pointProgram.totalMovement.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    const list = this.reportState.reportState.pointProgram.totalMovement.filter.data.length > 0 ? this.reportState.reportState.pointProgram.totalMovement.filter.data : this.reportState.reportState.pointProgram.totalMovement.list.data
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
