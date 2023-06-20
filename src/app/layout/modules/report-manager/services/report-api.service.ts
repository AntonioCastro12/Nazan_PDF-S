import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventoryKardex, InventoryStockDetail, InventoryStockResume } from '../models/report.entity';

@Injectable({
  providedIn: 'root'
})

export class ReportApiService {

  constructor(private _http: HttpClient) { }

  inventoryKardexProduct(data: string): Observable<InventoryKardex[]> {
    return this._http.get<InventoryKardex[]>(`${environment.apiUrl}/api/inventories/kardex-product${data}`);
  }
  inventoryStockResume(data: any): Observable<InventoryStockResume[]> {
    return this._http.post<InventoryStockResume[]>(`${environment.apiUrl}/api/inventories/inventory-stock/resume`, { ...data });
  }
  inventoryStockDetail(data: any): Observable<InventoryStockDetail[]> {
    return this._http.post<InventoryStockDetail[]>(`${environment.apiUrl}/api/inventories/inventory-stock/detail`, { ...data });
  }

}
