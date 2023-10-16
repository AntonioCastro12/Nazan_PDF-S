import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TemplateActionService, TemplateStateService } from '../../services';
import { UserStateService } from '@user-manager/services';

@Component({
  selector: 'template-sidebar-menu',
  templateUrl: './template-sidebar-menu.component.html',
})
export class TemplateSidebarMenuComponent implements OnInit {
  items!: MenuItem[];

  constructor(
    public _template: TemplateStateService,
    private _templateAction: TemplateActionService,
    private _user: UserStateService
  ) {}

  ngOnInit() {
    // let rol = this._user.state.getStorageUser();
    // this.items = this._templateAction.onMenu(
    //   rol.privileges.reportesadministrativos
    // );
  }
}
