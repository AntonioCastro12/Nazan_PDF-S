import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointProgramDetailPointsRoutingModule } from './point-program-detail-points-routing.module';
import { PointProgramDetailPointsComponent } from './point-program-detail-points.component';


@NgModule({
  declarations: [
    PointProgramDetailPointsComponent
  ],
  imports: [
    CommonModule,
    PointProgramDetailPointsRoutingModule
  ]
})
export class PointProgramDetailPointsModule { }
