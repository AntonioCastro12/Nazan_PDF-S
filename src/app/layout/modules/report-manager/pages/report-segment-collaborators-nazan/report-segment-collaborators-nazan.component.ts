import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { DateTime } from 'luxon';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonApiService } from '../../services/common-api.service';
import { CommonStateService } from '../../services/common-state.service';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import { segmentCollaboratorsNazanLabels } from '../../models/report.entity';
import { objectContainsValue, highlightSearchText } from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';

@Component({
  selector: 'app-report-segment-collaborators-nazan',
  templateUrl: './report-segment-collaborators-nazan.component.html',
  styleUrls: ['./report-segment-collaborators-nazan.component.scss'],
  providers: [
    HttpClient
  ]
})
export class ReportSegmentCollaboratorsNazan {
  searchText: string = "";
  segmentId: number = 0;
  isLoading: boolean = false;
  showModal: boolean = false;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';
  showDetail: boolean = false;
  originList: any[] = [{ name: 'xStore', id: "xstore" }, { name: 'xCenter', id: "xcenter" }];
  searchFormEntityLabels = searchFormEntityLabels;
  segmentCollaboratorsNazanLabels = segmentCollaboratorsNazanLabels;
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
    this.reportState.reportState.segments.collaboratorsNazan.list.data = []
    this.isLoading = true;
    this._reportApiService.segmentsCollaboratorsNazan(this.filter).subscribe({
      next: (data) => {
        this.reportState.reportState.segments.collaboratorsNazan.list = { data, total: data.length }
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
    if (this.segmentId === 0) {
      await this.setErrorModal('Error', 'Debe completar los datos del formulario de busqueda', '50px');
      return;
    }
    this.filter = `?&segmentId=${this.segmentId}`
    this.getList();
  }
  resetFilters() {
    this.segmentId = 0;
    this.filter = ''
  }

  async handleSearchRecords() {
    if (this.segmentId === 0) {
      await this.setErrorModal('Error', 'Debe completar los datos del formulario de busqueda', '50px');
      return;
    }
    const list = this.reportState.reportState.segments.collaboratorsNazan.list.data;
    this.reportState.reportState.segments.collaboratorsNazan.filter.data = list.filter((item) =>
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
    if (this.reportState.reportState.segments.collaboratorsNazan.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    const list = this.reportState.reportState.segments.collaboratorsNazan.filter.data.length > 0 ? this.reportState.reportState.segments.collaboratorsNazan.filter.data : this.reportState.reportState.segments.collaboratorsNazan.list.data
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
