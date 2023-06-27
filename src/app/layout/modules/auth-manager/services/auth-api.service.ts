import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthState } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})

export class AuthApiService {
  constructor(private _http: HttpClient) {
  }

  getUserInfo(): Observable<AuthState> {
    return this._http.post<AuthState>(`${environment.apiSecurity}/userinfo`, {});
  }
}
