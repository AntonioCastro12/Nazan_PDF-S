import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthState } from '../models/auth.model';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private subject = new BehaviorSubject<AuthState>(new AuthState());
  private state = this.subject.asObservable();

  authState = new AuthState();

  constructor(private readonly authApiService: AuthApiService) {
    console.log('pasando')
    this.authState.access_token = localStorage.getItem('access_token') ?? '';
    this.loadUserInfo();
    this.subject.next(this.authState);
  }

  loadUserInfo(): void {
    console.log('llegando a loadUserInfo')
    if (this.authState.nombre === '') {
      this.authApiService.getUserInfo().
        subscribe({
          next: (data) => {
            console.log('user info', data)
            //this.setInfoUser(data);
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
    this.authState = { ...user }
    this.subject.next(this.authState);
  }

  getToken() {
    return this.authState.access_token
  }

  getUser() {

  }

  getPermission() {

  }
}
