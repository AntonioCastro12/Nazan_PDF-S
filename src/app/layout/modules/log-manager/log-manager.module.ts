import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogManagerRoutingModule } from './log-manager-routing.module';
import { LogManagerComponent } from './log-manager.component';
import { LogHomeComponent } from './pages/log-home/log-home.component';
import { LogListComponent } from './pages/log-list/log-list.component';
import { LogDetailComponent } from './pages/log-detail/log-detail.component';
import { PrimeNgModule } from 'src/app/shared/vendor/prime-ng';
import { LuxonModule } from 'luxon-angular';


@NgModule({
  declarations: [
    LogManagerComponent,
    LogHomeComponent,
    LogListComponent,
    LogDetailComponent
  ],
  imports: [
    LuxonModule,
    CommonModule,
    LogManagerRoutingModule,
    PrimeNgModule
  ]
})
export class LogManagerModule { }
