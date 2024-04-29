import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersDashboardRoutingModule } from './orders-dashboard-routing.module';
import { OrdersDashboardComponent } from './orders-dashboard.component';
import { OrderDashboardHomeComponent } from './pages/order-dashboard-home/order-dashboard-home.component';
import { OrderDashboardStatusComponent } from './pages/order-dashboard-home/ui/order-dashboard-status/order-dashboard-status.component';
import { OrderDashboardAgeComponent } from './pages/order-dashboard-home/ui/order-dashboard-age/order-dashboard-age.component';
import { OrderDashboardBeforeListComponent } from './pages/order-dashboard-home/ui/order-dashboard-before-list/order-dashboard-before-list.component';
import { OrderDashboardInfoComponent } from './pages/order-dashboard-home/ui/order-dashboard-info/order-dashboard-info.component';
import { OrderDashboardMonthListComponent } from './pages/order-dashboard-home/ui/order-dashboard-month-list/order-dashboard-month-list.component';
import { OrderDashboardWeekListComponent } from './pages/order-dashboard-home/ui/order-dashboard-week-list/order-dashboard-week-list.component';
import { OrderDashboardFilterComponent } from './pages/order-dashboard-home/ui/order-dashboard-filter/order-dashboard-filter.component';

@NgModule({
  declarations: [
    OrderDashboardAgeComponent,
    OrderDashboardBeforeListComponent,
    OrderDashboardFilterComponent,
    OrderDashboardInfoComponent,
    OrderDashboardMonthListComponent,
    OrderDashboardStatusComponent,
    OrderDashboardWeekListComponent,
    OrderDashboardHomeComponent,
    OrdersDashboardComponent,
  ],
  imports: [CommonModule, OrdersDashboardRoutingModule],
})
export class OrdersDashboardModule {}
