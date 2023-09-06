import { Component } from '@angular/core';
import { AuthStateService } from '../../../auth-manager/services/auth-state.service';
import { CommonStateService } from '../../../report-manager/services/common-state.service';
import { ReportApiService } from '../../../report-manager/services/report-api.service';
import { ListHistoric, labelsListFavorites, labelsListHistoric, mapUrlReport } from 'src/app/layout/config/layout-manager/models/bookmarks.model';
@Component({
  selector: 'app-home-page-compomnent',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],

})
export class HomePageComponent {
  constructor(
    public authStateService: AuthStateService,
    public commonState: CommonStateService,
    private _reportApiService: ReportApiService) {
    this.authStateService.loadUserInfo()
  }
  labelsListFavorites = labelsListFavorites
  labelsListHistoric = labelsListHistoric


  getHistoric() {
    this._reportApiService.getHistoric().
      subscribe({
        next: (data) => {
          this.commonState.commonState.historic = data
        },
        error: (e) => {
          console.log('error loading data', e)
        },
        complete: () => {
          //this.isLoading = false;
        }
      })
  }
  getFavorites() {
    this._reportApiService.getFavorites().
      subscribe({
        next: (data) => {
          this.commonState.commonState.favorites = data
        },
        error: (e) => {
          console.log('error loading data', e)
        },
        complete: () => {
          //this.isLoading = false;
        }
      })
  }

  ngOnInit() {
    this.getHistoric()
    this.getFavorites()
  }

  getReportName(data: string) {
    const report = mapUrlReport.find(item => data.includes(item.url))
    return report ? report.name : data
  }

}
