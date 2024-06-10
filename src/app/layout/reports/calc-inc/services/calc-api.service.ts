import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments';
import {taGralDTO} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CalcApiService {

  constructor(
    private _http: HttpClient,
  ) { }

  catActuales(){
    const url= `${environment.apiUrl}/api/cat-calculator/cat-disponibles`
    let response$: any = this._http
      .get<any[]>(url);
    return response$;
  }
}
