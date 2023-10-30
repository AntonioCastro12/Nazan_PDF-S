import { Component } from '@angular/core';
import {
  PointProgramDetailPointsApiService,
  PointProgramDetailPointsStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'point-program-detail-points-options',
  templateUrl: './point-program-detail-points-options.component.html',
  styleUrls: ['./point-program-detail-points-options.component.scss'],
})
export class PointProgramDetailPointsOptionsComponent {
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
    public _pointProgramDetailPoints: PointProgramDetailPointsStateService,
    private _pointProgramDetailPointsApi: PointProgramDetailPointsApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._pointProgramDetailPoints.state.isVisibleForm =
      !this._pointProgramDetailPoints.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._pointProgramDetailPoints.state.isLoadingList = true;

    this._pointProgramDetailPointsApi
      .inventoryKardexProduct(
        this._pointProgramDetailPoints.state.pointProgramDetailPointsDTO
      )
      .subscribe({
        next: (data) => {
          this._pointProgramDetailPoints.state.pointProgramDetailPointsResponse =
            data;
          this._pointProgramDetailPoints.state.pointProgramDetailPointsResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.log(error);
        },
        complete: () => {
          this._pointProgramDetailPoints.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}
