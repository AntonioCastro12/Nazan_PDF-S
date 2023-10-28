import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import {
  InventoryStockResumeDTO,
  InventoryStockResumeResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class InventoryStockResumeApiService {
  constructor(private _http: HttpClient) {}

  inventoryStockResume(
    dto: InventoryStockResumeDTO
  ): Observable<InventoryStockResumeResponse[]> {
    const url = `${environment.apiUrl}/api/inventories/inventory-stock/resume`;
    const params: any = {};

    params['storeId'] = dto.storeId;

    let response$: any = this._http
      .get<InventoryStockResumeResponse[]>(url, { params })
      .pipe(map((data: any) => data));
    return response$;
  }
}
