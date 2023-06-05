import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { logEntityLabels } from '../../models/log.entity';
import { ReportApiService } from '../../services/report-api.service';
import { LogStateService } from '../../services/log-state.service';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ExcelService } from '../../services/excel.service';
@Component({
  selector: 'app-report-log',
  templateUrl: './report-order-log.component.html',
  styleUrls: ['./report-order-log.component.scss'],
  providers: [
    HttpClient
  ]
})
export class ReportOrderLogComponent {
  selectedStatus!: string;
  isLoading: boolean = true;
  showDetail: boolean = false;
  status: string = '';
  level: string = '';
  from: Date = new Date();
  to: Date = new Date();
  filter: object = {
    createdAt: {
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
  reportEntityLabels = logEntityLabels;
  constructor(private _excelService: ExcelService, private _reportApiService: ReportApiService, public logState: LogStateService, private router: Router) {
    this.getList();
  }
  onPageChange(event: any) {
    this.skip = event.first;
    this.take = event.rows;
  }

  getList() {
    this._reportApiService.listLogs({
      where: this.filter
    }).subscribe({
      next: (data) => {
        this.logState.logState.logList = { data, total: data.length }
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
        createdAt: {
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
      this.handleChangeFilter(filter, 'createdAt')
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
    this.level = '';
    this.from = new Date();
    this.to = new Date();
    this.filter = {
      createdAt: {
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
  async exportExcel() {
    const blob = await this._excelService.generateExcel(this.logState.logState.logList.data);
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
