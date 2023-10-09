import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthState } from '../models/auth.state';
import { UserInfoEntity } from '../models/auth.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private _http: HttpClient) {}

  getUserInfo(): Observable<UserInfoEntity> {
    return this._http.post<UserInfoEntity>(
      `${environment.apiSecurity}/userinfo`,
      {}
    );
  }
}
