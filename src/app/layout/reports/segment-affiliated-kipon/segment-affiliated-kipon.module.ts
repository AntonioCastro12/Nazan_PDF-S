import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentAffiliatedKiponRoutingModule } from './segment-affiliated-kipon-routing.module';
import { SegmentAffiliatedKiponComponent } from './segment-affiliated-kipon.component';


@NgModule({
  declarations: [
    SegmentAffiliatedKiponComponent
  ],
  imports: [
    CommonModule,
    SegmentAffiliatedKiponRoutingModule
  ]
})
export class SegmentAffiliatedKiponModule { }
