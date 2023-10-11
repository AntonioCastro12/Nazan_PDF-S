import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TemplateActionService } from '../../services';

@Component({
  selector: 'template-sidebar-menu',
  templateUrl: './template-sidebar-menu.component.html',
})
export class TemplateSidebarMenuComponent implements OnInit {
  items!: MenuItem[];

  constructor(private _templateAction: TemplateActionService) {}

  ngOnInit() {
    this.items = this._templateAction.onMenu();
  }
}
