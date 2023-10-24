import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KardexProductResponse } from '../models/inventory-kardex.response';
import { KardexProductDTO } from '../models/inventory-kardex.dto';

@Injectable({
  providedIn: 'root',
})
export class ReportApiService {
  constructor(private _http: HttpClient) {}

  inventoryKardexProduct(
    dto: KardexProductDTO
  ): Observable<KardexProductResponse[]> {
    let params = new HttpParams({
      fromObject: {
        obj: JSON.stringify(dto),
      },
    });

    return this._http.get<KardexProductResponse[]>(
      `${environment.apiUrl}/api/inventories/kardex-product`,
      { params }
    );
  }
}
