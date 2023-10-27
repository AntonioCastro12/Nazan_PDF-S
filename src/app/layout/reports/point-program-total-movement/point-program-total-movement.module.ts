import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointProgramTotalMovementRoutingModule } from './point-program-total-movement-routing.module';
import { PointProgramTotalMovementComponent } from './point-program-total-movement.component';


@NgModule({
  declarations: [
    PointProgramTotalMovementComponent
  ],
  imports: [
    CommonModule,
    PointProgramTotalMovementRoutingModule
  ]
})
export class PointProgramTotalMovementModule { }
