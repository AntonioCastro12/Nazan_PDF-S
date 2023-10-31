import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import { InventoryPodDTO, InventoryPodResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InventoryPodApiService {
  constructor(private _http: HttpClient) {}

  inventoryPod(dto: InventoryPodDTO): Observable<InventoryPodResponse[]> {
    const url = `${environment.apiUrl}/api/inventories/pod`;
    const params: any = {};

    params['storeId'] = dto.storeId;
    params['days'] = dto.days;

    let response$: any = this._http
      .get<InventoryPodResponse[]>(url, { params })
      .pipe(map((data: any) => data));
    return response$;
  }
}