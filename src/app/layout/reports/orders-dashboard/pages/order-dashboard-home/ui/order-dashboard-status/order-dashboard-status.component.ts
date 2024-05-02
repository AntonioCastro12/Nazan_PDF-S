import { Component, inject } from '@angular/core';
import { OrdersDashboardStateService } from '../../../../services/orders-dashboard-state.service';

@Component({
  selector: 'order-dashboard-status',
  standalone: false,
  template: `
    <section>
      <p-table
        #dt2
        [value]="_ordersDashboard.state.orderStateInfo.totalsByStatus"
        [paginator]="false"
        [rows]="15"
        styleClass="mt-3 p-datatable-sm"
        [loading]="_ordersDashboard.state.isLoadingList"
      >
        <ng-template pTemplate="header">
          <tr class="text-sm">
            <th class="text-center">
              {{ TEMPLATE_TEXT.store }}
            </th>
            <th class="text-center" id="{{ TEMPLATE_TEXT.status }}">
              {{ TEMPLATE_TEXT.title }}
            </th>
            <th class="text-center">
              {{ TEMPLATE_TEXT.qty }}
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage" let-columns>
          <tr>
            <td [attr.colspan]="9" class="text-center">
              {{
                _ordersDashboard.state.isLoadingList
                  ? TEMPLATE_TEXT.isLoadingOn
                  : TEMPLATE_TEXT.isResultEmpty
              }}
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-report>
          <tr class="text-sm">
            <td
              class="text-center"
              [innerHTML]="
                highlightSearchText(
                  searchText,
                  _ordersDashboard.state.storeSelected
                )
              "
            ></td>
            <td
              class="text-center"
              [innerHTML]="highlightSearchText(searchText, report.order_status)"
            ></td>
            <td
              class="text-center"
              [innerHTML]="highlightSearchText(searchText, report.qty)"
              [style]="{
                '
          width': '100px'
              }"
            ></td>
          </tr>
        </ng-template>
      </p-table>
    </section>
  `,
  styles: ``,
})
export class OrderDashboardStatusComponent {
  _ordersDashboard = inject(OrdersDashboardStateService);

  searchText: any;

  TEMPLATE_TEXT = {
    title: 'Por status de orden',
    store: 'Tienda',
    status: 'Status',
    qty: 'Total',
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
