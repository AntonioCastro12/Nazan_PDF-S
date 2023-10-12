import { Component } from '@angular/core';
import { AuthStateService } from '../../../auth-manager/services/auth-state.service';
import { CommonStateService } from '../../../report-manager/services/common-state.service';
import { ReportApiService } from '../../../report-manager/services/report-api.service';
import { Router } from '@angular/router';
import { TemplateStateService } from 'src/app/template';
import {
  labelsListFavorites,
  labelsListHistoric,
  mapUrlReport,
} from '../../models/bookmarks.model';

@Component({
  selector: 'app-home-page-compomnent',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(
    public _auth: AuthStateService,
    public _common: CommonStateService,
    private _reportApi: ReportApiService,
    private router: Router,
    private _template: TemplateStateService
  ) {
    this._auth.loadUserInfo();
  }
  labelsListFavorites = labelsListFavorites;
  labelsListHistoric = labelsListHistoric;
  index: number | null = null;

  getHistoric() {
    this._reportApi.getHistoric().subscribe({
      next: (data) => {
        const temp = data.map((item, index) => {
          return {
            index,
            url: item.url,
            createdAt: item.createdAt,
            searchCriteria: item.searchCriteria,
            updatedAt: item.updatedAt,
          };
        });
        this._common.state.historic = temp.slice(0, 5);
      },
      error: (e) => {
        console.error('error loading data', e);
      },
      complete: () => {
        //this.isLoading = false;
      },
    });
  }

  getFavorites() {
    this._reportApi.getFavorites().subscribe({
      next: (data) => {
        this._common.state.favorites = data;
      },
      error: (e) => {
        console.error('error loading data', e);
      },
      complete: () => {
        //this.isLoading = false;
      },
    });
  }

  ngOnInit() {
    this._template.state.sidebarMainVisible = true;
    this.getHistoric();
    this.getFavorites();
  }

  getReportName(data: string) {
    const report = mapUrlReport.find((item) => data.includes(item.url));
    return report ? report.name : data;
  }

  handleShowReport(data: string, index = null) {
    let report: any = '';
    report = mapUrlReport.find((item) => data.includes(item.url));
    let params = {};

    if (typeof index === 'number') {
      params = { historic: true, index };
    } else {
      params = { favorite: true };
    }
    this.router.navigate([`/layout/reports/${report.url}`], {
      queryParams: { ...params },
    });
  }
}
