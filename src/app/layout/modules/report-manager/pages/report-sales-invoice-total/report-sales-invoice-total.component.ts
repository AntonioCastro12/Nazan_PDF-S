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
import { ReportsExcelNames, salesInvoiceTotalLabels } from '../../models/report.entity';
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
  showChart: boolean = false;
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
  chart = new Chart();
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
        if (onSearch !== this.lastOptionsEntity.onSearch) {
          this.checkOnSearch();
        }
        if (onRefresh !== this.lastOptionsEntity.onRefresh) {
          this.handleSearch();
        }
        if (onDownload !== this.lastOptionsEntity.onDownload) {
          this.exportExcel();
        }
        if (onChart !== this.lastOptionsEntity.onChart) {
          this.lastOptionsEntity.onChart = onChart;
          this.handleChart();
        }
        this.lastOptionsEntity = { onChart, onDownload, onRefresh, onSearch, onShow };
      }
    });
  }

  checkOnSearch() {
    if (this.lastOptionsEntity.onChart) {
      this.showChart = false;
    }
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
    if (this.lastOptionsEntity.onChart) {
      this._optionServices.setChart()
      this.showChart = false;
    }
    if (this.selectedStore === null || typeof this.selectedStore === 'string') {
      await this.setErrorModal('Error', 'Debe completar los datos del formulario de busqueda', '50px');
      return;
    }
    this.filter = `?storeId=${this.selectedStore?.storeInfoId}&startDate=${DateTime.fromJSDate(new Date(this.from)).toFormat('yyyy-MM-dd')}&endDate=${DateTime.fromJSDate(new Date(this.to)).toFormat('yyyy-MM-dd')}`
    this.getList();
  }

  async handleChart() {
    if (this.lastOptionsEntity.onChart) {
      if (this.reportState.reportState.sales.invoiceTotal.list.data.length <= 0) {
        await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
        this._optionServices.setChart()
        return;
      }
      let list = this.reportState.reportState.sales.invoiceTotal.filter.data.length > 0 ? this.reportState.reportState.sales.invoiceTotal.filter.data : this.reportState.reportState.sales.invoiceTotal.list.data
      const ids = list.map(item => item[ID_DATA_NAME])
      list = this.reportState.reportState.sales.invoiceTotal.original.data.filter(item => {
        if (ids.includes(item[ID_DATA_NAME])) {
          return item
        }
      })

      console.log(list.map(item => item.totalMoneySale),
        list.map(item => item.totalMoneyFreight),
        list.map(item => item.totalMoneyReturn), list.map(item => item.businessDate))

      this.chart = new Chart({
        credits: {
          enabled: false
        },
        chart: {
          type: 'column'
        },
        title: {
          text: 'Totales de facturación'
        },
        xAxis: {
          reversed: true,
          categories: list.map(item => item.businessDate)
        },
        yAxis: {
          reversed: false,
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
          name: salesInvoiceTotalLabels.totalMoneySale,
          data: list.map(item => item.totalMoneySale),
          type: 'column'

        }, {
          name: salesInvoiceTotalLabels.totalMoneyFreight,
          data: list.map(item => item.totalMoneyFreight),
          type: 'column'

        }, {
          name: salesInvoiceTotalLabels.totalMoneyReturn,
          data: list.map(item => item.totalMoneyReturn),
          type: 'column'

        }]
      });
      this.showChart = true;
    } else {
      this.showChart = false;
    }

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
      await this.setErrorModal('Error', 'No hay datos a graficar', '50px');
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
    a.download = `${ReportsExcelNames.TOTALES_DE_FACTURACION_}${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  }




}
