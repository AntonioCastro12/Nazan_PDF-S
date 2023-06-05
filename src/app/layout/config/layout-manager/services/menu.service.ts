import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuChangeEvent } from 'src/app/layout/config/layout-manager/models/menu.entity';

import {
  warehouseMenu,
  adminMenu,
  frontdeskMenu,
  welcomeMenu,
} from 'src/app/layout/config/layout-manager/menus';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuSource = new Subject<MenuChangeEvent>();
  private resetSource = new Subject();

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();

  onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }

  reset() {
    this.resetSource.next(true);
  }

  onChangeMenu(menuValue: string) {
    let displayMeny: any = welcomeMenu;

    menuValue == 'warehouse' ? (displayMeny = warehouseMenu) : '';
    menuValue == 'frontdesk' ? (displayMeny = frontdeskMenu) : '';
    menuValue == 'admin' ? (displayMeny = adminMenu) : '';

    return displayMeny;
  }
}
