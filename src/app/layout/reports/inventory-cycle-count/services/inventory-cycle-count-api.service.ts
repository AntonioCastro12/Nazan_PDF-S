import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryCycleCountDTO, InventoryCycleCountResponse } from '../models';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root',
})
export class InventoryCycleCountApiService {
  constructor(private _http: HttpClient) {}

  inventoryCycleCountDTO(
    dto: InventoryCycleCountDTO
  ): Observable<InventoryCycleCountResponse[]> {
    const url = `${environment.apiUrl}/api/inventories/cycle-count`;
    const params: any = {};

    params['storeId'] = dto.storeId;
    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;
    params['type'] = dto.type;

    let response$: any = this._http
      .get<InventoryCycleCountResponse[]>(url, { params })
      .pipe(map((data: any) => data));
    return response$;
  }
}
