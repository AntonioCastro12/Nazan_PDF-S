import { Injectable } from '@angular/core';
import { TemplateStateService } from './template-state.service';
import { Router } from '@angular/router';
// import { mainMenu } from '../components/template-sidebar-menu/sidebar-menus/main-menu';
import { welcomeMenu } from '../components/template-sidebar-menu/menus';

@Injectable({
  providedIn: 'root',
})
export class TemplateActionService {
  moduleActive: string = '';
  mainMenu: any = '';
  welcomeMenu = welcomeMenu;
  constructor(private _template: TemplateStateService, private router: Router) {
    const routeParts = this.router.url.split('/');
    const section = routeParts[2];
    this.moduleActive = section;
    console.log(section);
  }

  onOpenSidebar() {
    this._template.state.sidebarMainVisible = true;
  }

  onCloseSidebar() {
    this._template.state.sidebarMainVisible = false;
  }

  onMenu() {
    this.mainMenu = welcomeMenu;
    return this.mainMenu;
  }
}
