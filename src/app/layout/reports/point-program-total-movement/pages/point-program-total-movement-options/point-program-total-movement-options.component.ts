import { Component } from '@angular/core';
import {
  PointProgramTotalMovementApiService,
  PointProgramTotalMovementStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'point-program-total-movement-options',
  templateUrl: './point-program-total-movement-options.component.html',
  styleUrls: ['./point-program-total-movement-options.component.scss'],
})
export class PointProgramTotalMovementOptionsComponent {
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
    public _pointProgramTotalMovement: PointProgramTotalMovementStateService,
    private _pointProgramTotalMovementApi: PointProgramTotalMovementApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._pointProgramTotalMovement.state.isVisibleForm =
      !this._pointProgramTotalMovement.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._pointProgramTotalMovement.state.isLoadingList = true;

    this._pointProgramTotalMovementApi
      .pointProgramTotalMovement(
        this._pointProgramTotalMovement.state.pointProgramTotalMovementDTO
      )
      .subscribe({
        next: (data) => {
          this._pointProgramTotalMovement.state.pointProgramTotalMovementResponse =
            data;
          this._pointProgramTotalMovement.state.pointProgramTotalMovementResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.log(error);
        },
        complete: () => {
          this._pointProgramTotalMovement.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}
