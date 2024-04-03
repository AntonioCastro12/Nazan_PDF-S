import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PruebaReporteComponent} from '../prueba-reporte/prueba-reporte.component';

const routes: Routes = [
  { path: '', redirectTo: 'reporte-prueba', pathMatch: 'full' },
  { path: 'reporte-prueba', component:PruebaReporteComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebaReporteRoutingModule { }
