import { Component } from '@angular/core';
import { TemplateActionService, TemplateStateService } from './services';

@Component({
  selector: 'app-template-manager',
  templateUrl: './template-manager.component.html',
})
export class TemplateManagerComponent {
  constructor(
    public _template: TemplateStateService,
    private _templateAction: TemplateActionService
  ) {
    //this._templateAction.onCheckAccess();
    const currentMenu = JSON.parse(
      sessionStorage.getItem('configMenu') as string
    );
    //this._template.state.sidebarOverlayVisible = true;
  }

  columnChange() {
    if (this._template.state.sidebarMainVisible) {
      return 'p-left-20';
    } else {
      return 'p-left-0';
    }
  }
}
