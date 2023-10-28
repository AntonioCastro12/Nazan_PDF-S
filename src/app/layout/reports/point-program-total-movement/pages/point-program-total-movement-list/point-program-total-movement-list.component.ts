import { Component } from '@angular/core';
import { PointProgramTotalMovementStateService } from '../../services';
import { pointProgramTotalMovementResponseName } from '../../models';

@Component({
  selector: 'point-program-total-movement-list',
  templateUrl: './point-program-total-movement-list.component.html',
  styleUrls: ['./point-program-total-movement-list.component.scss'],
})
export class PointProgramTotalMovementListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  pointProgramTotalMovementResponseName = pointProgramTotalMovementResponseName;

  searchText = '';

  constructor(
    public _pointProgramTotalMovement: PointProgramTotalMovementStateService
  ) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
