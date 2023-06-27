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
@NgModule({
  declarations: [AppComponent, SsoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MyLoaderModule,
    AuthManagerModule
  ],
  providers: [AuthStateService],
  bootstrap: [AppComponent],
})
export class AppModule { }
