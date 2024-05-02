import { filter } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { OrdersDashboardStateService } from '../../services/orders-dashboard-state.service';
import { OrdersDashboardActionService } from '../../services/orders-dashboard.action.service';

@Component({
  selector: 'order-dashboard-home',
  standalone: false,
  template: `
    <ng-container>
      <article class="card">
        <order-dashboard-info></order-dashboard-info>
        <orders-dashboard-store-selector />
      </article>
      <section class="card flex flex-row gap-3">
        <article class="basis-1/2">
          <order-dashboard-status />
        </article>
        <article class="basis-1/2">
          <order-dashboard-age />
        </article>
      </section>

      <section class="card">
        <order-dashboard-filter />
      </section>

      <section class="card">
        <order-dashboard-before-list />
        <order-dashboard-month-list />
        <order-dashboard-week-list />
      </section>
    </ng-container>
  `,
  styles: ``,
})
export class OrderDashboardHomeComponent implements OnInit {
  _ordersDashboard = inject(OrdersDashboardStateService);
  _ordersDashboardAction = inject(OrdersDashboardActionService);

  ngOnInit(): void {
    this._ordersDashboard.state.storeSelected = JSON.parse(
      sessionStorage.getItem('storeSelected') as string
    );

    this._ordersDashboard.state.storeList = JSON.parse(
      sessionStorage.getItem('storeList') as string
    ).filter((x: any) => x.type == 'W');

    console.log('Selected store:', this._ordersDashboard.state.storeSelected);
    console.log('Store list:', this._ordersDashboard.state.storeList);

    if (this._ordersDashboard.state.storeSelected.id) {
      this._ordersDashboardAction.onOrdersDashboardInfo(
        this._ordersDashboard.state.storeSelected.id
      );
    }
  }
}
