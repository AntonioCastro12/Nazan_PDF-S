import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentCollaboratorsNazanRoutingModule } from './segment-collaborators-nazan-routing.module';
import { SegmentCollaboratorsNazanComponent } from './segment-collaborators-nazan.component';


@NgModule({
  declarations: [
    SegmentCollaboratorsNazanComponent
  ],
  imports: [
    CommonModule,
    SegmentCollaboratorsNazanRoutingModule
  ]
})
export class SegmentCollaboratorsNazanModule { }
