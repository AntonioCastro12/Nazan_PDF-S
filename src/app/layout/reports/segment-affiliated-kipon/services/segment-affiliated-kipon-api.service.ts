import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import {
  SegmentAffiliatedKiponDTO,
  SegmentAffiliatedKiponResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class SegmentAffiliatedKiponApiService {
  constructor(private _http: HttpClient) {}

  inventoryKardexProduct(
    dto: SegmentAffiliatedKiponDTO
  ): Observable<SegmentAffiliatedKiponResponse[]> {
    const url = `${environment.apiUrl}/api/segments/affiliated-kipon`;
    const params: any = {};

    params['store_id'] = dto.store_id;
    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;

    let response$: any = this._http
      .get<SegmentAffiliatedKiponResponse[]>(url, { params })
      .pipe(map((data: any) => data));
    return response$;
  }
}
