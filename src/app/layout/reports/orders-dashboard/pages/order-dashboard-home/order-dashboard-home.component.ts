import { filter } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { OrdersDashboardStateService } from '../../services/orders-dashboard-state.service';

@Component({
  selector: 'order-dashboard-home',
  standalone: false,
  template: `
    <ng-container>
      <article class="card">
        <order-dashboard-info></order-dashboard-info>
        <orders-dashboard-store-selector></orders-dashboard-store-selector>
      </article>
      <section class="card">
        <order-dashboard-status></order-dashboard-status>
        <order-dashboard-age></order-dashboard-age>
      </section>

      <section class="card">
        <order-dashboard-filter></order-dashboard-filter>
      </section>

      <section class="card">
        <order-dashboard-before-list></order-dashboard-before-list>
        <order-dashboard-month-list></order-dashboard-month-list>
        <order-dashboard-week-list></order-dashboard-week-list>
      </section>
    </ng-container>
  `,
  styles: ``,
})
export class OrderDashboardHomeComponent implements OnInit {
  _ordersDashboard = inject(OrdersDashboardStateService);

  ngOnInit(): void {
    this._ordersDashboard.state.storeSelected = JSON.parse(
      sessionStorage.getItem('storeSelected') as string
    );

    this._ordersDashboard.state.storeList = JSON.parse(
      sessionStorage.getItem('storeList') as string
    ).filter((x: any) => x.type == 'W');

    console.log('Selected store:', this._ordersDashboard.state.storeSelected);
    console.log('Store list:', this._ordersDashboard.state.storeList);
  }
}
