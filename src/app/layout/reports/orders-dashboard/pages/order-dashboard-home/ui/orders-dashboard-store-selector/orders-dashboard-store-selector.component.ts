import { Component, inject } from '@angular/core';
import { OrdersDashboardStateService } from '../../../../services/orders-dashboard-state.service';
import { OrdersDashboardActionService } from '../../../../services/orders-dashboard.action.service';

@Component({
  selector: 'orders-dashboard-store-selector',
  standalone: false,
  template: `
    <p-dropdown
      inputId="storeId"
      [options]="_ordersDashboard.state.storeList"
      [(ngModel)]="this._ordersDashboard.state.storeSelected"
      optionValue="id"
      optionLabel="name"
      placeholder="{{ TEMPLATE_TXT.selectStore }}"
      styleClass="w-full"
      (onClick)="searchInfo()"
    ></p-dropdown>
  `,
  styles: ``,
})
export class OrdersDashboardStoreSelectorComponent {
  _ordersDashboard = inject(OrdersDashboardStateService);
  _ordersDashboardAction = inject(OrdersDashboardActionService);

  TEMPLATE_TXT = {
    selectStore: 'Tienda seleccionada',
  };

  searchInfo() {
    this._ordersDashboardAction.onOrdersDashboardInfo(
      this._ordersDashboard.state.storeSelected.id
    );
  }
}
