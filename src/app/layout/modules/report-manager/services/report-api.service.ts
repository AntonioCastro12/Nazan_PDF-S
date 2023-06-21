import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventoryComparison, InventoryKardex, InventoryPod, InventoryStockDetail, InventoryStockResume, PointProgramDetailPoints, PointProgramDetailWallet, PointProgramTotalMovement, SalesGeneralSales, SalesInvoiceTotal, SegmentAffiliatedKipon, SegmentCollaboratorsNazan } from '../models/report.entity';

@Injectable({
  providedIn: 'root'
})

export class ReportApiService {

  constructor(private _http: HttpClient) { }

  inventoryKardexProduct(data: string): Observable<InventoryKardex[]> {
    return this._http.get<InventoryKardex[]>(`${environment.apiUrl}/api/inventories/kardex-product${data}`);
  }

  inventoryStockResume(data: any): Observable<InventoryStockResume[]> {
    return this._http.get<InventoryStockResume[]>(`${environment.apiUrl}/api/inventories/inventory-stock/resume${data}`);
  }

  inventoryStockDetails(data: any): Observable<InventoryStockDetail[]> {
    return this._http.get<InventoryStockDetail[]>(`${environment.apiUrl}/api/inventories/inventory-stock/detail${data}`);
  }

  inventoryComparison(data: any): Observable<InventoryComparison[]> {
    return this._http.get<InventoryComparison[]>(`${environment.apiUrl}/api/inventories/inventory-comparison${data}`);
  }

  inventoryPod(data: any): Observable<InventoryPod[]> {
    return this._http.get<InventoryPod[]>(`${environment.apiUrl}/api/inventories/pod${data}`);
  }

  inventorySapXstore(data: any): Observable<InventoryPod[]> {
    return this._http.get<InventoryPod[]>(`${environment.apiUrl}/api/inventories/sap-xstore${data}`);
  }

  pointProgramDetailPoints(data: any): Observable<PointProgramDetailPoints[]> {
    return this._http.get<PointProgramDetailPoints[]>(`${environment.apiUrl}/api/point-program/total-points${data}`);
  }

  pointProgramTotalMovement(data: any): Observable<PointProgramTotalMovement[]> {
    return this._http.get<PointProgramTotalMovement[]>(`${environment.apiUrl}/api/point-program/total-movement${data}`);
  }

  pointProgramDetailWallet(data: any): Observable<PointProgramDetailWallet[]> {
    return this._http.get<PointProgramDetailWallet[]>(`${environment.apiUrl}/api/point-program/detail-wallet${data}`);
  }

  salesInvoiceTotal(data: any): Observable<SalesInvoiceTotal[]> {
    return this._http.get<SalesInvoiceTotal[]>(`${environment.apiUrl}/api/sales/invoice-total${data}`);
  }

  salesGeneralSales(data: any): Observable<SalesGeneralSales[]> {
    return this._http.get<SalesGeneralSales[]>(`${environment.apiUrl}/api/sales/general-sales${data}`);
  }

  segmentsAffiliatedKipon(data: any): Observable<SegmentAffiliatedKipon[]> {
    return this._http.get<SegmentAffiliatedKipon[]>(`${environment.apiUrl}/api/segments/affiliated-kipon${data}`);
  }

  segmentsCollaboratorsNazan(data: any): Observable<SegmentCollaboratorsNazan[]> {
    return this._http.get<SegmentCollaboratorsNazan[]>(`${environment.apiUrl}/api/segments/collaborators-nazan${data}`);
  }

}
