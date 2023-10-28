import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import {
  SegmentCollaboratorsNazanDTO,
  SegmentCollaboratorsNazanResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class SegmentCollaboratorsNazanApiService {
  constructor(private _http: HttpClient) {}

  inventoryKardexProduct(
    dto: SegmentCollaboratorsNazanDTO
  ): Observable<SegmentCollaboratorsNazanResponse[]> {
    const url = `${environment.apiUrl}/api/segments/collaborators-nazan`;
    const params: any = {};

    // params['storeId'] = dto.storeId;
    // params['productId'] = dto.productId;
    // params['origin'] = dto.origin;
    // params['startDate'] = dto.startDate;
    // params['endDate'] = dto.endDate;

    let response$: any = this._http
      .get<SegmentCollaboratorsNazanResponse[]>(url, { params })
      .pipe(map((data: any) => data));
    return response$;
  }
}
