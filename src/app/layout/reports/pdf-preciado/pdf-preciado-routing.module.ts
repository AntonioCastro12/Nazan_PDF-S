import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfPreciadoComponent } from './pdf-preciado.component';

const routes: Routes = [
  {path:'', redirectTo:'report', pathMatch:'full'},
  {path:'report', component:PdfPreciadoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfPreciadoRoutingModule { }
