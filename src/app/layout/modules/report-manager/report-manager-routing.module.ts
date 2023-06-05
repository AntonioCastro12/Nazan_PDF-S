import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportManagerComponent } from './report-manager.component';
import { ReportOrderListComponent } from './pages/report-order-list/report-order-list.component';
import { ReportOrderLogComponent } from './pages/report-log-list/report-order-log.component';

const routes: Routes = [{ path: '', redirectTo: 'orders/list', pathMatch: 'full' }, {
  path: '',
  component: ReportManagerComponent,
  children: [
    { path: 'orders', redirectTo: 'orders/list', pathMatch: 'full' },
    { path: 'orders/list', component: ReportOrderListComponent },
    { path: 'logs/list', component: ReportOrderLogComponent, pathMatch: 'full' },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportManagerRoutingModule { }
