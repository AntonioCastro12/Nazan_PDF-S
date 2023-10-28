import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import { SalesInvoiceTotalDTO, SalesInvoiceTotalResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SalesInvoiceTotalApiService {
  constructor(private _http: HttpClient) {}

  inventoryKardexProduct(
    dto: SalesInvoiceTotalDTO
  ): Observable<SalesInvoiceTotalResponse[]> {
    const url = `${environment.apiUrl}/api/sales/invoice-total`;
    const params: any = {};

    params['storeId'] = dto.storeId;
    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;

    let response$: any = this._http
      .get<SalesInvoiceTotalResponse[]>(url, { params })
      .pipe(map((data: any) => data));
    return response$;
  }
}
