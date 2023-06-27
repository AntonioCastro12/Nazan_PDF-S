import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthState } from '../models/auth.model';
import { AuthApiService } from './auth-api.service';
import { LayoutStateService } from 'src/app/layout/config/layout-manager';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private subject = new BehaviorSubject<AuthState>(new AuthState());
  private state = this.subject.asObservable();

  authState = new AuthState();

  constructor(private readonly authApiService: AuthApiService) {
    this.loadUserInfo();
    this.subject.next(this.authState);
  }

  loadUserInfo(): void {

    if (this.authState.nombre === '') {
      this.authApiService.getUserInfo().
        subscribe({
          next: (data) => {
            console.log('user info', data)
            this.setInfoUser(data);
          },
          error: (e) => {
            console.log('error loading data', e)
          },
          complete: () => {
            return
          }
        });
    }
  }

  setInfoUser(user: AuthState) {
    console.log('setInfoUser')
    this.authState = { ...user }
    this.subject.next(this.authState);
  }

  getToken() {
    return localStorage.getItem('access_token') ?? ''
  }

  getUser() {

  }

  getPermission() {

  }
}
