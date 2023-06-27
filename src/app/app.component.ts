import { Component, OnInit } from '@angular/core';
import { Identity } from './sso/identity.interface';
import { SsoService } from './sso/sso.service';
import { $Loading } from 'src/app/shared/popups';
import { AuthStateService } from './layout/modules/auth-manager/services/auth-state.service';
import { LayoutState } from './layout/config/layout-manager/models/layout.state';
import { LayoutStateService } from './layout/config/layout-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _sso: SsoService, public authStateService: AuthStateService) { }
  identity!: Identity | null;


  ngOnInit(): void {
    this.authStateService.loadUserInfo()
  }

  onLogoutSSO = () => {
    this.identity = null;
  };

  onShowLoginSSO = () => {
    $Loading.close();
  };

  ssoCallback = (
    data: { token: any; identity: Identity },
    refresh: boolean,
    clearIdentity: boolean = false
  ) => {
    if (clearIdentity) {
      localStorage.removeItem('access_token');
      this._sso.setToken(null);
      this.identity = null;
      return;
    }
    if (!data || !data.token) return $Loading.close();

    if (refresh) {
      localStorage.setItem('access_token', data.token);
      this._sso.setToken(data.token);
      return;
    }

    if (this.identity) return;

    //FIXME: obtener permisos desde el back de prenomina
    this.identity = data.identity;

    // redirection
    // this.router.navigate([route]);

    // guardar token
    localStorage.setItem('access_token', data.token);
    this._sso.setToken(data.token);
    $Loading.close();
  };
}
