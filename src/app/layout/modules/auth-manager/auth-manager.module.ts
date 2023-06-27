import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStateService } from './services/auth-state.service';
import { AuthApiService } from './services/auth-api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../config/layout-manager/common/interceptors/auth.interceptor';
export const AUTH_STATE_SERVICE_TOKEN = new InjectionToken<AuthStateService>('AuthStateService');

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers: [
    AuthStateService,
    AuthApiService,
    {
      provide: AUTH_STATE_SERVICE_TOKEN, // Usa el token de inyección
      useClass: AuthStateService,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class AuthManagerModule { }
