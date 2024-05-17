import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TiempoAireDetalleComponent} from '../tiempo-aire-detalle/tiempo-aire-detalle.component';

import { TiempoAireDetalleRoutingModule } from './tiempo-aire-detalle-routing.module';


@NgModule({
  declarations: [
    TiempoAireDetalleComponent
    
  ],
  imports: [
    CommonModule,
    TiempoAireDetalleRoutingModule
  ]
})
export class TiempoAireDetalleModule { }
