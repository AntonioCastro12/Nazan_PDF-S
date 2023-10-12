import { Component, OnInit } from '@angular/core';
import { Identity } from './sso/identity.interface';
import { SsoService } from './sso/sso.service';
import { $Loading } from 'src/app/shared/popups';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  identity!: Identity | null;

  constructor(private readonly _sso: SsoService) {}

  ngOnInit(): void {
    $Loading.open();
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
      sessionStorage.removeItem('access_token');
      this._sso.setToken(null);
      this.identity = null;
      return;
    }
    if (!data || !data.token) return $Loading.close();

    if (refresh) {
      sessionStorage.setItem('access_token', data.token);
      this._sso.setToken(data.token);
      return;
    }

    if (this.identity) return;

    //FIXME: obtener permisos desde el back de prenomina
    this.identity = data.identity;

    // redirection
    // this.router.navigate([route]);

    // guardar token
    sessionStorage.setItem('access_token', data.token);
    this._sso.setToken(data.token);
    $Loading.close();
  };
}
