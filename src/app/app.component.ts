import { Component, OnInit } from '@angular/core';
import { Identity } from './sso/identity.interface';
import { SsoService } from './sso/sso.service';
import { $Loading } from 'src/app/shared/popups';
import { AuthStateService } from './layout/modules/auth-manager/services/auth-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  identity!: Identity | null;

  constructor(private readonly _sso: SsoService, private readonly authStateService: AuthStateService) { }

  ngOnInit(): void {
    this.authStateService.loadUserInfo()
    // $Loading.open();
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
