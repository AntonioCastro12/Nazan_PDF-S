import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import { InventorySapXstoreResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InventorySapXstoreApiService {
  constructor(private _http: HttpClient) {}

  inventorySapXstore(): Observable<InventorySapXstoreResponse[]> {
    const url = `${environment.apiUrl}/api/inventories/sap-xstore`;
    const params: any = {};

    let response$: any = this._http
      .get<InventorySapXstoreResponse[]>(url, { params })
      .pipe(map((data: any) => data));
    return response$;
  }
}
