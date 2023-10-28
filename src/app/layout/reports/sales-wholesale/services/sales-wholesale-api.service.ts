import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import { SalesWholesaleDTO, SalesWholesaleResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SalesWholesaleApiService {
  constructor(private _http: HttpClient) {}

  inventoryKardexProduct(
    dto: SalesWholesaleDTO
  ): Observable<SalesWholesaleResponse[]> {
    const url = `${environment.apiUrl}/api/sales/wholesale-sales`;
    const params: any = {};

    params['storeId'] = dto.storeId;
    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;

    let response$: any = this._http
      .get<SalesWholesaleResponse[]>(url, { params })
      .pipe(map((data: any) => data));
    return response$;
  }
}
