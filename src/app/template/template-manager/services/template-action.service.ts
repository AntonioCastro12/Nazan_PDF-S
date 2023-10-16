import { Injectable } from '@angular/core';
import { TemplateStateService } from './template-state.service';
import { Router } from '@angular/router';
// import { mainMenu } from '../components/template-sidebar-menu/sidebar-menus/main-menu';
import { welcomeMenu } from '../components/template-sidebar-menu/menus';
import { staffIngresosMenu } from '../components/template-sidebar-menu/menus/staff-ingresos-menu';
import { staffInventariosOSTMenu } from '../components/template-sidebar-menu/menus/staff-inventariosOST-menu';
import { staffKiponMenu } from '../components/template-sidebar-menu/menus/staff-kipon-menu';
import { staffMarketingMenu } from '../components/template-sidebar-menu/menus/staff-marketing-menu';
import { staffMayoreoMenu } from '../components/template-sidebar-menu/menus/staff-mayoreo-menu';
import { staffMenudeoMenu } from '../components/template-sidebar-menu/menus/staff-menudeo-menu';
import { staffPlaneacionMenu } from '../components/template-sidebar-menu/menus/staff-planeacion-menu';
import { tiendaMenu } from '../components/template-sidebar-menu/menus/tienda-menu';
import { sistemasMenu } from '../components/template-sidebar-menu/menus/sistemas-menu';

@Injectable({
  providedIn: 'root',
})
export class TemplateActionService {
  moduleActive: string = '';
  mainMenu: any = '';
  welcomeMenu = welcomeMenu;
  staffIngresosMenu = staffIngresosMenu;
  staffInventariosOSTMenu = staffInventariosOSTMenu;
  staffKiponMenu = staffKiponMenu;
  staffMarketingMenu = staffMarketingMenu;
  staffMayoreoMenu = staffMayoreoMenu;
  staffMenudeoMenu = staffMenudeoMenu;
  staffPlaneacionMenu = staffPlaneacionMenu;
  tiendaMenu = tiendaMenu;
  sistemasMenu = sistemasMenu;
  constructor(private _template: TemplateStateService, private router: Router) {
    const routeParts = this.router.url.split('/');
    const section = routeParts[2];
    this.moduleActive = section;
    //console.log(section);
  }

  onOpenSidebar() {
    this._template.state.sidebarMainVisible = true;
  }

  onCloseSidebar() {
    this._template.state.sidebarMainVisible = false;
  }

  onMenu(rol: string) {
    if (rol == 'staff_ingresos') {
      this._template.state.currentMenu = staffIngresosMenu;
    }
    if (rol == 'staff_inventario_ost') {
      this._template.state.currentMenu = staffInventariosOSTMenu;
    }
    if (rol == 'staff_kipon') {
      this._template.state.currentMenu = staffKiponMenu;
    }
    if (rol == 'staff_marketing') {
      this._template.state.currentMenu = staffMarketingMenu;
    }
    if (rol == 'staff_mayoreo') {
      this._template.state.currentMenu = staffMayoreoMenu;
    }
    if (rol == 'staff_menudeo') {
      this._template.state.currentMenu = staffMenudeoMenu;
    }
    if (rol == 'staff_planeacion') {
      this._template.state.currentMenu = staffPlaneacionMenu;
    }
    if (rol == 'tienda') {
      this._template.state.currentMenu = tiendaMenu;
    }
    if (rol == 'sistemas') {
      this._template.state.currentMenu = sistemasMenu;
    }
    // No se usan admin, operaciones, marketing, admin_finanzas, plan_compras,
    //this.mainMenu = sistemasMenu;
    //return this.mainMenu;
  }

  goStartPage() {
    this.router.navigate(['/']);
  }

  goExitPage() {
    this.router.navigate(['/exit']);
  }
}
