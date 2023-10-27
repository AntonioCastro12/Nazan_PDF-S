import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointProgramDetailWalletRoutingModule } from './point-program-detail-wallet-routing.module';
import { PointProgramDetailWalletComponent } from './point-program-detail-wallet.component';


@NgModule({
  declarations: [
    PointProgramDetailWalletComponent
  ],
  imports: [
    CommonModule,
    PointProgramDetailWalletRoutingModule
  ]
})
export class PointProgramDetailWalletModule { }
