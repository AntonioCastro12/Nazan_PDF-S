import { Injectable, Injector } from '@angular/core';
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

  constructor(private readonly authApiService: AuthApiService, private injector: Injector) {
    this.loadUserInfo();
    this.subject.next(this.authState);
  }

  resetState(): void {
    this.authState = new AuthState();
    this.subject.next(this.authState);
  }
  loadUserInfo(): void {
    this.authApiService.getUserInfo().
      subscribe({
        next: (data) => {
          this.setInfoUser(data);
        },
        error: (e) => {
          console.log('error loading data', e)
          this.resetState();
        },
        complete: () => {
          return
        }
      });

  }

  setInfoUser(user: AuthState) {
    const layout = this.injector.get(LayoutStateService);
    layout.setSidebar()
    this.authState = { ...user }
    this.subject.next(this.authState);
  }
}
