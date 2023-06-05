import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderEntity } from '../models/order.entity';
import { LogEntity } from '../models/log.entity';

@Injectable({
  providedIn: 'root'
})

export class ReportApiService {

  constructor(private _http: HttpClient) { }

  listOrders(data: any): Observable<OrderEntity[]> {
    return this._http.post<OrderEntity[]>('https://apimiddlewarecedis.impuls.com.mx/api/report-module/order', { ...data });
  }

  listLogs(data: any): Observable<LogEntity[]> {
    return this._http.post<LogEntity[]>('https://apimiddlewarecedis.impuls.com.mx/api/report-module/logs', { ...data });
  }

}
