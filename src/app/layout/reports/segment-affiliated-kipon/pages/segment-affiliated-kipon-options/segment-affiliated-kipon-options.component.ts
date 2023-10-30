import { Component } from '@angular/core';
import {
  SegmentAffiliatedKiponApiService,
  SegmentAffiliatedKiponStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'segment-affiliated-kipon-options',
  templateUrl: './segment-affiliated-kipon-options.component.html',
  styleUrls: ['./segment-affiliated-kipon-options.component.scss'],
})
export class SegmentAffiliatedKiponOptionsComponent {
  TEMPLATE_TEXT = {
    showSearch: 'Buscar los registros',
    showChart: 'Ver gráfico',
    showRefresh: 'Renovar la lista',
    showDownload: 'Exportar registros',
    showEye: 'Mostrar registro',
    showFavorite: 'Agregar a favoritos',
    title: 'Herramientas de reporte',
  };

  showSearch: any = true;
  showChart: any = true;
  showRefresh: any = true;
  showDownload: any = true;
  showEye: any = true;
  showFavorite: any = true;

  constructor(
    public _segmentAffiliatedKipon: SegmentAffiliatedKiponStateService,
    private _segmentAffiliatedKiponApi: SegmentAffiliatedKiponApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._segmentAffiliatedKipon.state.isVisibleForm =
      !this._segmentAffiliatedKipon.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._segmentAffiliatedKipon.state.isLoadingList = true;

    this._segmentAffiliatedKiponApi
      .inventoryKardexProduct(
        this._segmentAffiliatedKipon.state.segmentAffiliatedKiponDTO
      )
      .subscribe({
        next: (data) => {
          this._segmentAffiliatedKipon.state.segmentAffiliatedKiponResponse =
            data;
          this._segmentAffiliatedKipon.state.segmentAffiliatedKiponResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.log(error);
        },
        complete: () => {
          this._segmentAffiliatedKipon.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}
