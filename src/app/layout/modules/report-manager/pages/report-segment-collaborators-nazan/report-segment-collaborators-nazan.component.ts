import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonStateService } from '../../services/common-state.service';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import { ReportsExcelNames, segmentCollaboratorsNazanLabels } from '../../models/report.entity';
import { objectContainsValue, highlightSearchText, ID_DATA_NAME, addIdToData, formatArrayValues } from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';
import { DateTime } from 'luxon';
import { AuthStateService } from '../../../auth-manager/services/auth-state.service';
import { ActivatedRoute } from '@angular/router';

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
  segmentId: number = 165;
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
  lastOptionsEntity: OptionsEntity = { onChart: false, onDownload: false, onRefresh: false, onSearch: false, onShow: false, onFavorite: false };

  constructor(
    public _optionServices: OptionsStateService,
    private _reportApiService: ReportApiService,
    public reportState: ReportStateService,
    public commonState: CommonStateService,
    public _excelService: ExcelService,
    public authStateService: AuthStateService,
    private route: ActivatedRoute
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
    this.reportState.reportState.segments.collaboratorsNazan.list.data = []
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
    if (this.route.snapshot.queryParamMap.get('favorite')) {
      const report: any = this.commonState.commonState.favorites.find(item => item.url === '/segments/collaborators-nazan')
      if (report) {
        this.segmentId = report.searchCriteria.segmentId
      }
    }
    this._optionServices.setSearch()
    this.handleSearch()
  }

  handleFavorite() {
    this.isLoading = true
    const data = {
      searchCriteria: {
        segmentId: this.segmentId,
      },
      url: "/segments/collaborators-nazan"
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


  getList() {
    this.reportState.reportState.segments.collaboratorsNazan.list.data = []
    this.isLoading = true;
    this._reportApiService.segmentsCollaboratorsNazan(this.filter).subscribe({
      next: (data) => {
        const dataOriginal = addIdToData(data);
        this.reportState.reportState.segments.collaboratorsNazan.original = { data: dataOriginal, total: dataOriginal.length }
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {
          signup_date: { type: 'date', format: 'dd-MM-yyyy' },
          birthday: { type: 'date', format: 'dd-MM-yyyy' },
        });
        this.reportState.reportState.segments.collaboratorsNazan.list = { data: dataFormatted, total: dataFormatted.length }

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
    this.filter = `?&segmentId=${this.segmentId ? this.segmentId : ''}`
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
    let list = this.reportState.reportState.segments.collaboratorsNazan.filter.data.length > 0 ? this.reportState.reportState.segments.collaboratorsNazan.filter.data : this.reportState.reportState.segments.collaboratorsNazan.list.data
    const ids = list.map(item => item[ID_DATA_NAME])
    list = this.reportState.reportState.segments.collaboratorsNazan.original.data.filter(item => {
      if (ids.includes(item[ID_DATA_NAME])) {
        return item
      }
    })
    const blob = await this._excelService.generateExcel(list);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${ReportsExcelNames.SEGMENTOS_COLABORADORES_NAZAN_}${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  }




}
