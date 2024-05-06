import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import {
  InventoryStockDetailResponse,
  InventoryStockResumeDTO,
  InventoryStockResumeResponse,
  creditoSocioDTO,
  TicketDetailDTO
} from '../models';
import { Favorite } from '@home-manager/models/bookmarks.model';

@Injectable({
  providedIn: 'root'
})
export class CreditoApiService {
  constructor(private _http: HttpClient) {}

  membershipCreditHistory(dto:creditoSocioDTO){
    const url= `${environment.apiUrl}/api/membership-credit/credit-history`
    const params: any = {};
    params['memberId'] = dto.memberId;
    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;
    let response$: any = this._http
      .get<any[]>(url, { params });
    return response$;
  }

  // ticketDetail(dto:creditoSocioDTO){
  ticketDetail(dto:TicketDetailDTO){
    const url= `${environment.apiUrl}/api/membership-credit/ticket-resume`
    const params: any = {};
    params['store'] = dto.store;
    params['date'] = dto.date;
    params['ticketNumber'] = dto.ticketNumber;
    params['cashRegister'] = dto.cashRegister;
    let response$: any = this._http
      .get<any[]>(url, { params });
    return response$;
  }

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

  inventoryStockDetails(
    dto: InventoryStockResumeDTO
  ): Observable<InventoryStockDetailResponse[]> {
    const url = `${environment.apiUrl}/api/inventories/inventory-stock/detail`;
    const params: any = {};

    params['storeId'] = dto.storeId;

    let response$: any = this._http
      .get<InventoryStockResumeResponse[]>(url, { params })
      .pipe(map((data: any) => data));
    return response$;
  }

  favorite(data: any): Observable<Favorite> {
    return this._http.post<Favorite>(
      `${environment.apiUrl}/api/bookmarks/favorites`,
      data
    );
  }
}
