import { Component, OnInit } from '@angular/core';
import {
  warehouseMenu,
  adminMenu,
  frontdeskMenu,
  welcomeMenu,
} from 'src/app/layout/config/layout-manager/menus';
import { LayoutService, LayoutStateService } from '../../services';

@Component({
  selector: 'layout-manager-menu',
  templateUrl: './layout-manager-menu.component.html',
  styleUrls: ['./layout-manager-menu.component.scss'],
})
export class LayoutManagerMenuComponent implements OnInit {
  model: any[] = welcomeMenu;

  layoutState;
  constructor(
    public layoutService: LayoutService,
    public layoutStateService: LayoutStateService,

  ) {
    this.layoutState = this.layoutStateService.layoutState;
  }

  ngOnInit() {

  }
}
