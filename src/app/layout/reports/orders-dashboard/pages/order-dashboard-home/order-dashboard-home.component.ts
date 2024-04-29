import { Component } from '@angular/core';

@Component({
  selector: 'order-dashboard-home',
  standalone: false,
  template: `
    <ng-container>
      <order-dashboard-info></order-dashboard-info>
      <section>
        <order-dashboard-status></order-dashboard-status>
        <order-dashboard-age></order-dashboard-age>
      </section>

      <section>
        <order-dashboard-filter></order-dashboard-filter>
      </section>
      
      <section>
        <order-dashboard-before-list></order-dashboard-before-list>
        <order-dashboard-month-list></order-dashboard-month-list>
        <order-dashboard-week-list></order-dashboard-week-list>
      </section>
    </ng-container>
  `,
  styles: ``,
})
export class OrderDashboardHomeComponent {}
