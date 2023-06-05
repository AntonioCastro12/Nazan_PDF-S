import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OnDemandManagerApiService {

  constructor(private _http: HttpClient) { }

  proccessOrders(): Observable<any> {
    return this._http.post<any>('https://apimiddlewarecedis.impuls.com.mx/api/order-module/extract-order', {});
  }

  closeOrders(): Observable<any> {
    return this._http.post<any>('https://apimiddlewarecedis.impuls.com.mx/api/order-module/close-order', {});
  }

}
