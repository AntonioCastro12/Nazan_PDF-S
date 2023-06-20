import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportManagerComponent } from './report-manager.component';
import { ReportInventoryKardexComponent } from './pages/report-inventory-cardex/report-inventory-kardex.component';
import { ReportInventoryStockResumeComponent } from './pages/report-inventory-stock-resume/report-inventory-stock-resume.component';


const routes: Routes = [{ path: '', redirectTo: 'inventory', pathMatch: 'full' }, {
  path: '',
  component: ReportManagerComponent,
  children: [
    { path: 'inventory', redirectTo: 'inventory/kardex', pathMatch: 'full' },
    { path: 'inventory/kardex', component: ReportInventoryKardexComponent },
    { path: 'inventory/stock-resume', component: ReportInventoryStockResumeComponent },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportManagerRoutingModule { }
