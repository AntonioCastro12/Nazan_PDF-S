import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '@shared/vendor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
 
import {PdfPreciadoComponent} from './pdf-preciado.component';
import {PdfPreciadoFormComponent} from './pages/pdf-preciado-form/pdf-preciado-form.component';
import {PdfPreciadoListComponent} from './pages/pdf-preciado-list/pdf-preciado-list.component';
import {PdfPreciadoOptionsComponent} from './pages/pdf-preciado-options/pdf-preciado-options.component';

import { PdfPreciadoRoutingModule } from './pdf-preciado-routing.module';


@NgModule({
  declarations: [
    PdfPreciadoComponent,
    PdfPreciadoFormComponent,
    PdfPreciadoListComponent,
    PdfPreciadoOptionsComponent
  ],
  imports: [
    CommonModule,
    PdfPreciadoRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
  ]
})
export class PdfPreciadoModule { }
