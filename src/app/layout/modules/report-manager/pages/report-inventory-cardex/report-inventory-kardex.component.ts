import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderTrackingEntity, Status, orderEntityLabels, orderTrackingEntityLabels } from '../../models/order.entity';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
@Component({
  selector: 'app-report-list',
  templateUrl: './report-inventory-kardex.component.html',
  styleUrls: ['./report-inventory-kardex.component.scss'],
  providers: [
    HttpClient
  ]
})
export class ReportInventoryKardexComponent {
  statusList: Status[] = [{ name: 'Open', id: "open" }, { name: 'Close', id: "close" }];
  selectedStatus!: string;
  isLoading: boolean = true;
  showModal: boolean = false;
  showDetail: boolean = false;
  status: string = '';
  order_id: string = '';
  from: Date = new Date();
  to: Date = new Date();
  filter: object = {
    date_created: {
      gte: DateTime.fromJSDate(new Date(this.from)).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      }),
      lte: DateTime.fromJSDate(new Date(this.to)).set({
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 0,
      })
    },
  };
  take: number = 2;
  skip: number = 0;
  first: number = 0;
  reportEntityLabels = orderEntityLabels;
  reportTrackingEntityLabels = orderTrackingEntityLabels;
  subscription: any = {};
  optionsState: any = {};
  constructor(public _optionServices: OptionsStateService, private _reportApiService: ReportApiService, public reportState: ReportStateService, private router: Router) {
    this.getList();
  }
  ngOnInit() {
    this._optionServices.state.subscribe(optionsState => {
      // Asigna el nuevo valor del estado al objeto optionsState en el componente

      console.log('Cambios detectados:');

      // Ejecuta alguna actividad según los cambios detectados:
      if (optionsState.OptionsEntity.onChart) {
        // Código para ejecutar si la propiedad `onChart` del objeto `OptionsEntity` cambió a `true`
      }
      if (optionsState.OptionsEntity.onDownload) {
        // Código para ejecutar si la propiedad `onDownload` del objeto `OptionsEntity` cambió a `true`
      }
      if (optionsState.OptionsEntity.onSearch) {
        // Código para ejecutar si la propiedad `onDownload` del objeto `OptionsEntity` cambió a `true`
        console.log('aca')
      } else {
        console.log('false')
      }
      // ...
    });
  }
  onPageChange(event: any) {
    this.skip = event.first;
    this.take = event.rows;
  }

  getList() {
    this._reportApiService.listOrders({
      /* select: {
        order_id: true,
        date_created: true,
        date_updated: true,
        status: true,
        id_sap: true,
        tracking: {
          select: {
            comment: true,
            date_closed: true,
            date_opened: true,
            id_sap: true,
            order_id: true,
            status: true,
          }

        }
      },
      where: this.filter */
    }).subscribe({
      next: (data) => {
        this.reportState.reportState.orderList = { data, total: data.length }
      },
      error: (e) => {
        console.log('error loading data', e)
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }


  handleChangeInput(e: Event, name: string) {
    const filterValue = (e.target as HTMLInputElement).value;
    const filter = {
      [name]: {
        contains: filterValue
      }
    }
    this.handleChangeFilter(filter, name)
  }
  handleChangeOrderId(e: Event, name: string) {
    const filterValue = (e.target as HTMLInputElement).value;
    const filter = {
      [name]: {
        contains: filterValue
      }
    }
    this.handleChangeFilter(filter, name)
  }
  handleChangeStatus(e: any, name: string) {
    const filter = {
      [name]: e.value
    }
    this.handleChangeFilter(filter, name)
  }
  handleDateInput(e: any, name: string) {
    if (this.from && this.to) {
      const filter = {
        date_created: {
          gte: DateTime.fromJSDate(new Date(this.from)).set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          }),
          lte: DateTime.fromJSDate(new Date(this.to)).set({
            hour: 23,
            minute: 59,
            second: 59,
            millisecond: 0,
          })
        },
      }
      this.handleChangeFilter(filter, 'date_created')
    }
  }
  handleChangeFilter(filterValue: object, name: string) {
    this.filter = {
      ...this.filter,
      ...filterValue
    }
    this.isLoading = true;
    this.getList();
  }

  showreport(NroTicker: string) {
    this.router.navigate(['/layout/report/detail', NroTicker]);
  }

  resetFilters() {
    this.selectedStatus = '';
    this.status = '';
    this.order_id = '';
    this.from = new Date();
    this.to = new Date();
    this.filter = {
      date_created: {
        gte: DateTime.fromJSDate(new Date(this.from)).set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        }),
        lte: DateTime.fromJSDate(new Date(this.to)).set({
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 0,
        })
      },
    };
    this.isLoading = true;
    this.getList();
  }

  showDetails(data: OrderTrackingEntity[]) {
    this.reportState.reportState.trackingActive = data;
    this.showModal = true;
  }

}
