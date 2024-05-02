import { Injectable, inject } from '@angular/core';
import { OrdersDashboardApiService } from './orders-dashboard.api.service';
import { OrdersDashboardStateService } from './orders-dashboard-state.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class OrdersDashboardActionService {
  _ordersDashboardApi = inject(OrdersDashboardApiService);
  _ordersDashboard = inject(OrdersDashboardStateService);

  _toastr = inject(ToastrService);

  onOrdersDashboardInfo(store: string) {
    this._ordersDashboardApi.ordersDashboardInfo(store).subscribe({
      next: (response) => {
        this._ordersDashboard.state.orderStateInfo = response;
      },
      error: (error) => {
        this._toastr.error('Ups... ha ocurrido un error', error.error.message);
        console.log(error);
      },
      complete: () => {
        this._ordersDashboard.state.isLoadingList = false;
      },
    });
  }
}
