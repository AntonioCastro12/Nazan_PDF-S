import { Component } from '@angular/core';
import { PointProgramDetailPointsStateService } from '../../services';
import { pointProgramDetailPointsResponseName } from '../../models';

@Component({
  selector: 'point-program-detail-points-list',
  templateUrl: './point-program-detail-points-list.component.html',
  styleUrls: ['./point-program-detail-points-list.component.scss'],
})
export class PointProgramDetailPointsListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  pointProgramDetailPointsResponseName = pointProgramDetailPointsResponseName;

  searchText = '';

  constructor(
    public _pointProgramDetailPoints: PointProgramDetailPointsStateService
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
