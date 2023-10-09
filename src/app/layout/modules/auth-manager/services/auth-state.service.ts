import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthState } from '../models/auth.state';
import { AuthApiService } from './auth-api.service';
import { LayoutStateService } from 'src/app/layout/config/layout-manager';
import { UserInfoEntity } from '../models/auth.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private subject = new BehaviorSubject<AuthState>(new AuthState());
  private state = this.subject.asObservable();

  stateTemp = new AuthState();

  constructor(
    private readonly authApiService: AuthApiService,
    private injector: Injector
  ) {
    this.state.subscribe((state) => (this.stateTemp = state));
  }

  resetUserInfo(): void {
    this.stateTemp.userInfo = new UserInfoEntity();
  }

  loadUserInfo(): void {
    this.authApiService.getUserInfo().subscribe({
      next: (data) => {
        console.log({ user: data });
        this.stateTemp.userInfo = data;
        this.setInfoUser();
      },
      error: (e) => {
        console.error('error loading data', e);
        this.resetUserInfo();
      },
      complete: () => {
        return;
      },
    });
  }

  setInfoUser(user?: UserInfoEntity) {
    const layout = this.injector.get(LayoutStateService);
    layout.setSidebar();
    // this.userInfo = { ...user };
    // this.subject.next(this.userInfo);
  }
}
