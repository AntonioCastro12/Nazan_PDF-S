import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonApiService } from '../../services/common-api.service';
import { CommonStateService } from '../../services/common-state.service';
import { Store } from '../../models/store.model';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import { inventoryKardexLabels } from '../../models/report.entity';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-inventory-kardex.component.html',
  styleUrls: ['./report-inventory-kardex.component.scss'],
  providers: [
    HttpClient
  ]
})
export class ReportInventoryKardexComponent {
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
  status: string = '';
  originList: any[] = [{ name: 'xStore', id: "xstore" }, { name: 'xCenter', id: "xcenter" }];
  searchFormEntityLabels = searchFormEntityLabels;
  inventoryKardexLabels = inventoryKardexLabels;
  productCode: string = '';
  from: Date = new Date();
  to: Date = new Date();
  filter: string = '';
  subscription: any = {};
  optionsState: any = {};
  constructor(
    public _optionServices: OptionsStateService,
    private _reportApiService: ReportApiService,
    private _commonApiService: CommonApiService,
    public reportState: ReportStateService,
    public commonState: CommonStateService,
  ) {
  }
  ngOnInit() {
    this.getStores()
    this._optionServices.state.subscribe(optionsState => {
      if (optionsState.OptionsEntity.onRefresh) {
        this.handleSearch()
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
    this.isLoading = true;
    this._reportApiService.inventoryKardexProduct(this.filter).subscribe({
      next: (data) => {
        this.reportState.reportState.inventory.kardex.list = { data, total: data.length }
      },
      error: (e) => {
        console.log('error loading data', e)
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  handleSearch() {
    if (this.selectedStore === null || this.productCode === "" || this.selectedOrigin === "") {
      this.titleModal = 'Error'
      this.textModal = 'Debe completar los datos del formulario de busqueda'
      this.widthModal = '50px'
      this.showModal = true
      return;
    }
    this.filter = `?storeId=${this.selectedStore?.storeInfoId}&productId=${this.productCode}&origin=${this.selectedOrigin}&startDate=${DateTime.fromJSDate(new Date(this.from)).toFormat('yyyy-MM-dd')}&endDate=${DateTime.fromJSDate(new Date(this.to)).toFormat('yyyy-MM-dd')}`
    this.getList();
  }
  resetFilters() {
    this.selectedStore = null;
    this.selectedOrigin = '';
    this.productCode = '';
    this.status = '';
    this.from = new Date();
    this.to = new Date();
    this.filter = ''
  }

  showDetails(data: any) {
    this.showModal = true;
  }

}
