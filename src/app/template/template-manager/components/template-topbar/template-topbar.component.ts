import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateActionService, TemplateStateService } from '../../services';
import { UserStateService } from '@user-manager/services';

@Component({
  selector: 'template-topbar',
  templateUrl: './template-topbar.component.html',
})
export class TemplateTopbarComponent {
  constructor(
    public _templateAction: TemplateActionService,
    public _user: UserStateService,
    public router: Router,
    public _template: TemplateStateService
  ) {}

  goStartPage() {
    this.router.navigate(['/']);
  }

  changeRol(event: any) {
    this.router.navigate(['/']);
    this._templateAction.onMenu(event.value);
  }
}
