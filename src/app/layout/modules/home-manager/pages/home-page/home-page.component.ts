import { Component } from '@angular/core';
import { AuthStateService } from '../../../auth-manager/services/auth-state.service';
import { CommonStateService } from '../../../report-manager/services/common-state.service';
import { ReportApiService } from '../../../report-manager/services/report-api.service';
import { Router } from '@angular/router';
import { TemplateActionService, TemplateStateService } from 'src/app/template';
import {
  labelsListFavorites,
  labelsListHistoric,
  mapUrlReport,
} from '../../models/bookmarks.model';
import { UserHydraService } from '@user-manager/services/user-hydra.service';
import { StoreApiService } from '@store-manager/services';
import { StoreStateService } from '@store-manager/services';
import { UserEntity } from '@user-manager/models';
import { UserStateService } from '@user-manager/services';

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
    private _template: TemplateStateService,
    private _userHydra: UserHydraService,
    private _storeApi: StoreApiService,
    private _store: StoreStateService,
    private _user: UserStateService,
    private _templateAction: TemplateActionService
  ) {
    // this._auth.loadUserInfo();
    this.getUserInfo();
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

  // GET ALL STORE
  onGetStoreList() {
    this._storeApi.getStoreList().subscribe({
      next: (data) => {
        const filter = data.map((x: any) => {
          return {
            id: x.storeInfoId,
            name: x.storeInfoName,
            type: x.storeInfoType,
          };
        });
        this._store.state.storeList = filter;
        this._store.state.storeFilterList = filter;
        this._store.state.setStoreList(filter);
      },
      error: (error) => {
        console.error(error);
        return;
      },
      complete: () => {
        return;
      },
    });
  }

  getUserInfo() {
    let access_token = sessionStorage.getItem('access_token') as string;
    this._userHydra.getUserInfo(access_token).subscribe({
      next: (data: UserEntity) => {
        //console.log({ DATA_HIDRA: data });
        this._user.state.userSelected = data;
        this._user.state.setStorageUser(data);
        this._template.state.roleList = [
          'staff_ingresos',
          'staff_inventario_ost',
          'staff_kipon',
          'staff_marketing',
          'staff_mayoreo',
          'staff_menudeo',
          'staff_planeacion',
          'tienda',
        ];
        //this._template.state.roleList = data.privileges.reportesadministrativos;
        this.onSelectMenu(data.privileges.reportesadministrativos[0]);

        let temp = {
          id: data.tienda,
          name: data.tiendaNombre,
          type: data.tiendaTipo,
        };
        this._store.state.storeSelected = temp;
        this._store.state.setStoreSelected(temp);
      },
      error: (error) => console.error(error),
      complete: () => {
        //console.log('getUserInfo')
      },
    });
  }

  onSelectMenu(rol: string) {
    this._templateAction.onMenu(rol);
    this._template.state.sidebarRol = false;
  }
}
