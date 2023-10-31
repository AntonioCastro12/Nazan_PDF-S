import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import { SalesGeneralSalesDTO, SalesGeneralSalesResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SalesGeneralSalesApiService {
  constructor(private _http: HttpClient) {}

  inventoryKardexProduct(dto: SalesGeneralSalesDTO): Observable<any> {
    const url = `${environment.apiUrl}/api/sales/general-sales`;
    const params: any = {};

    params['storeId'] = dto.storeId;
    params['businessDate'] = dto.businessDate;

    let response$: any = this._http
      .get<any>(url, { params })
      .pipe(map((data: any) => data));
    return response$;
  }
}