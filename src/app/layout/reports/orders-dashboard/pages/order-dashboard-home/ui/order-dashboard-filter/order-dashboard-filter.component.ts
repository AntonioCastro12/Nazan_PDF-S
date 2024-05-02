import { Component, inject } from '@angular/core';
import { OrdersDashboardStateService } from '../../../../services/orders-dashboard-state.service';

@Component({
  selector: 'order-dashboard-filter',
  standalone: false,
  template: `
    <section>
      <input
        placeholder="Buscador"
        type="text"
        pInputText
        [(ngModel)]="_ordersDashboard.state.filter"
      />
    </section>
  `,
  styles: ``,
})
export class OrderDashboardFilterComponent {
  _ordersDashboard = inject(OrdersDashboardStateService);
}
