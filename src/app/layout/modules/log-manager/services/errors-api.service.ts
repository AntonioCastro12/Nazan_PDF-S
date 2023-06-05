import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseErrorsList } from '../models/errors.entity';

@Injectable({
  providedIn: 'root'
})

export class ErrorsApiService {

  constructor(private _http: HttpClient) { }

  list(data: any): Observable<ResponseErrorsList> {
    return this._http.post<ResponseErrorsList>('http://localhost:3051/api/tickets/errors', { ...data });
  }
}
