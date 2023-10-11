import { Injectable } from '@angular/core';
import { TemplateStateService } from './template-state.service';
import { Router } from '@angular/router';
import { mainMenu } from '../components/template-sidebar-menu/sidebar-menus/main-menu';

@Injectable({
  providedIn: 'root',
})
export class TemplateActionService {
  moduleActive: string = '';
  mainMenu = mainMenu;
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
    mainMenu;
    // const mainMenu: any = mainMenu;
    // //  [
    // //   {
    // //     label: 'BIENVENIDA',
    // //     expanded: true,
    // //     items: [
    // //       {
    // //         label: 'Inicio',
    // //         routerLink: '/nav/welcome',
    // //       },
    // //     ],
    // //   },
    // //   {
    // //     label: 'OPERACIONES',
    // //     icon: 'pi pi-truck',
    // //     expanded:
    // //       this.moduleActive == 'client-manager'
    // //         ? true
    // //         : this.moduleActive == 'promoter-manager'
    // //         ? true
    // //         : false,
    // //     items: [
    // //       {
    // //         label: 'Clientes',
    // //         icon: 'pi pi-id-card',
    // //         routerLink: '/nav/client-manager/create',
    // //       },
    // //       {
    // //         label: 'Promotores',
    // //         icon: 'pi pi-users',
    // //         routerLink: '/nav/promoter-manager/list',
    // //         routerLinkActiveOptions: { exact: true },
    // //       },
    // //     ],
    // //   },
    // //   {
    // //     label: 'CONFIGURACIONES',
    // //     icon: 'pi pi-cog',
    // //     expanded:
    // //       this.moduleActive == 'user-manager'
    // //         ? true
    // //         : this.moduleActive == 'config-manager'
    // //         ? true
    // //         : false,
    // //     items: [
    // //       {
    // //         label: 'Usuarios',
    // //         icon: 'pi pi-users',
    // //         routerLink: '/nav/user-manager/list',
    // //       },
    // //       {
    // //         label: 'Tiendas',
    // //         icon: 'pi pi-shopping-cart',
    // //         routerLink: '/nav/config-manager/list',
    // //       },
    // //     ],
    // //   },
    // //   {
    // //     label: 'Salir',
    // //     icon: 'pi pi-power-off',
    // //     routerLink: '/exit',
    // //   },
    // // ];
    return mainMenu;
  }
}
