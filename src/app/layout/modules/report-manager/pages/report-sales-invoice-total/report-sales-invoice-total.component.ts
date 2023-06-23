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
import { salesInvoiceTotalLabels } from '../../models/report.entity';
import { objectContainsValue, highlightSearchText, addIdToData, formatArrayValues, ID_DATA_NAME } from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-report-sales-invoice-total',
  templateUrl: './report-sales-invoice-total.component.html',
  styleUrls: ['./report-sales-invoice-total.component.scss'],
  providers: [
    HttpClient
  ],
})
export class ReportSalesInvoiceTotal {
  searchText: string = "";
  selectedStore: Store | null = null;
  suggestions: Store[] = [];
  isLoading: boolean = false;
  showModal: boolean = false;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';
  showDetail: boolean = false;
  originList: any[] = [{ name: 'xStore', id: "xstore" }, { name: 'xCenter', id: "xcenter" }];
  searchFormEntityLabels = searchFormEntityLabels;
  salesInvoiceTotalLabels = salesInvoiceTotalLabels;
  from: Date = new Date();
  to: Date = new Date();
  filter: string = '';
  subscription: any = {};
  optionsState: any = {};
  highlightSearchText = highlightSearchText;
  lastOptionsEntity: OptionsEntity = { onChart: false, onDownload: false, onRefresh: false, onSearch: false, onShow: false };
  /* chart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Monthly Average Rainfall'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: {
      reversed: true,
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yAxis: {
      reversed: false,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        },
        pointPlacement: 'between'
      }
    },
    series: [{
      name: 'Tokyo',
      data: [54.4, 95.6, 194.1, 216.4, 148.5, 135.6, 176.0, 144.0, 129.2, 106.4, 71.5, 49.9],
      type: 'column'

    }, {
      name: 'New York',
      data: [92.3, 106.6, 83.5, 91.2, 104.3, 105.0, 84.5, 106.0, 93.4, 98.5, 78.8, 83.6],
      type: 'column'

    }, {
      name: 'London',
      data: [51.2, 59.3, 65.2, 52.4, 59.6, 48.3, 47.0, 41.4, 39.3, 38.8, 39.3, 48.9],
      type: 'column'

    }, {
      name: 'Berlin',
      data: [51.1, 46.8, 39.1, 47.6, 60.4, 57.4, 75.5, 52.6, 39.7, 34.5, 33.2, 42.4],
      type: 'column'

    }]
  }); */
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
    this.reportState.reportState.sales.invoiceTotal.list.data = []
    this.isLoading = true;
    this._reportApiService.salesInvoiceTotal(this.filter).subscribe({
      next: (data) => {
        const dataOriginal = addIdToData(data);
        this.reportState.reportState.sales.invoiceTotal.original = { data: dataOriginal, total: dataOriginal.length }
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {
          businessDate: { type: 'date', format: 'dd-MM-yyyy' },
          totalMoneyReturn: { type: 'number', format: 'currency' },
          totalMoneySale: { type: 'number', format: 'currency' },
          totalPercentReturn: { type: 'number', format: 'percent', suffix: '%' },
          unitPercentReturn: { type: 'number', format: 'percent', suffix: '%' },
        });
        this.reportState.reportState.sales.invoiceTotal.list = { data: dataFormatted, total: dataFormatted.length }
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
    this.filter = `?storeId=${this.selectedStore?.storeInfoId}&startDate=${DateTime.fromJSDate(new Date(this.from)).toFormat('yyyy-MM-dd')}&endDate=${DateTime.fromJSDate(new Date(this.to)).toFormat('yyyy-MM-dd')}`
    this.getList();
  }
  resetFilters() {
    this.selectedStore = null;
    this.from = new Date();
    this.to = new Date();
    this.filter = ''
  }

  handleSearchRecords() {
    const list = this.reportState.reportState.sales.invoiceTotal.list.data;
    this.reportState.reportState.sales.invoiceTotal.filter.data = list.filter((item) =>
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
    if (this.reportState.reportState.sales.invoiceTotal.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list = this.reportState.reportState.sales.invoiceTotal.filter.data.length > 0 ? this.reportState.reportState.sales.invoiceTotal.filter.data : this.reportState.reportState.sales.invoiceTotal.list.data
    const ids = list.map(item => item[ID_DATA_NAME])
    list = this.reportState.reportState.sales.invoiceTotal.original.data.filter(item => {
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
