import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import {
  SegmentAffiliatedKiponDTO,
  SegmentAffiliatedKiponResponse,
} from '../models';
import { Favorite } from '@home-manager/models/bookmarks.model';

@Injectable({
  providedIn: 'root',
})
export class SegmentAffiliatedKiponApiService {
  constructor(private _http: HttpClient) {}

  segmentAffiliatedKiponList(
    dto: SegmentAffiliatedKiponDTO
  ): Observable<SegmentAffiliatedKiponResponse[]> {
    const url = `${environment.apiUrl}/api/segments/affiliated-kipon`;
    const params: any = {};

    params['storeId'] = dto.storeId;
    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;

    let response$: any = this._http
      .get<SegmentAffiliatedKiponResponse[]>(url, { params })
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