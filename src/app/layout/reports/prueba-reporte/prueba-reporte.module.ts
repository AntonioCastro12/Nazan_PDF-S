import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PruebaReporteComponent} from '../prueba-reporte/prueba-reporte.component'

import { PruebaReporteRoutingModule } from './prueba-reporte-routing.module';


@NgModule({
  declarations: [
    PruebaReporteComponent
  ],
  imports: [
    CommonModule,
    PruebaReporteRoutingModule
  ]
})
export class PruebaReporteModule { }
