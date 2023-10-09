import { Component } from '@angular/core';
import { AuthStateService } from '../../../auth-manager/services/auth-state.service';
import { CommonStateService } from '../../../report-manager/services/common-state.service';
import { ReportApiService } from '../../../report-manager/services/report-api.service';
import {
  ListHistoric,
  labelsListFavorites,
  labelsListHistoric,
  mapUrlReport,
} from 'src/app/layout/config/layout-manager/models/bookmarks.model';
import { Router } from '@angular/router';
import { LayoutStateService } from 'src/app/layout/config/layout-manager';
@Component({
  selector: 'app-home-page-compomnent',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  layoutState;

  constructor(
    public authStateService: AuthStateService,
    public commonState: CommonStateService,
    private _reportApiService: ReportApiService,
    private router: Router,
    private layoutStateService: LayoutStateService
  ) {
    this.authStateService.loadUserInfo();
    this.layoutState = this.layoutStateService.layoutState;
  }
  labelsListFavorites = labelsListFavorites;
  labelsListHistoric = labelsListHistoric;
  index: number | null = null;

  getHistoric() {
    this._reportApiService.getHistoric().subscribe({
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
        this.commonState.commonState.historic = temp.slice(0, 5);
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
    this._reportApiService.getFavorites().subscribe({
      next: (data) => {
        this.commonState.commonState.favorites = data;
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
    this.layoutState.config.layoutConfig.sidebarActive = true;
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
