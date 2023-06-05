import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportManagerComponent } from '../report-manager/report-manager.component';
import { OndemandProcessOrdersComponent } from './pages/ondemand-process-orders/ondemand-process-orders.component';
import { OndemandCloseOrdersComponent } from './pages/ondemand-close-orders/ondemand-close-orders.component';

const routes: Routes = [{ path: '', redirectTo: 'processOrders', pathMatch: 'full' }, {
  path: '',
  component: ReportManagerComponent,
  children: [
    { path: 'processOrders', component: OndemandProcessOrdersComponent },
    { path: 'closeOrders', component: OndemandCloseOrdersComponent, pathMatch: 'full' },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnDemandManagerRoutingModule { }
