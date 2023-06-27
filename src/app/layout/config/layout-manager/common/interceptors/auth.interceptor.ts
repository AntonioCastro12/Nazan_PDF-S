import { HttpHandler, HttpEvent, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_STATE_SERVICE_TOKEN } from 'src/app/layout/modules/auth-manager/auth-manager.module';
import { AuthStateService } from 'src/app/layout/modules/auth-manager/services/auth-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(AUTH_STATE_SERVICE_TOKEN) private readonly authState: AuthStateService) { } // Usa el nuevo token

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${this.authState.getToken() ? this.authState.getToken() : ''}`
      ),
    });
    return next.handle(authReq);
  }
}
