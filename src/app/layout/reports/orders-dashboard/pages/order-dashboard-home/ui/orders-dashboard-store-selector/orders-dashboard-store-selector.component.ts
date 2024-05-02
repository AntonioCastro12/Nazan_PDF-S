import { StoreStateService } from '@store-manager/services/store-state.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'orders-dashboard-store-selector',
  standalone: false,

  template: `
    <p-dropdown
      inputId="storeId"
      [options]="_store.state.storeList"
      [(ngModel)]="_store.state.storeSelected"
      field="name"
      placeholder="{{ TEMPLATE_TXT.selectStore }}"
      styleClass="w-full"
    ></p-dropdown>
  `,
  styles: ``,
})
export class OrdersDashboardStoreSelectorComponent {
  _store = inject(StoreStateService);

  TEMPLATE_TXT = {
    selectStore: 'Tienda seleccionada',
  };
}
