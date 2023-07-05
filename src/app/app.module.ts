import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SsoComponent } from './sso/sso.component';
import { MyLoaderModule } from './core/loader/loader.module';
import { AuthManagerModule } from './layout/modules/auth-manager/auth-manager.module';
import { AuthStateService } from './layout/modules/auth-manager/services/auth-state.service';
import { AuthInterceptor } from './layout/config/layout-manager/common/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent, SsoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MyLoaderModule,
    AuthManagerModule,
  ],
  providers: [
    AuthStateService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
