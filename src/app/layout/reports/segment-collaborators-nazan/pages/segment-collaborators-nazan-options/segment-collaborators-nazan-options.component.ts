import { Component } from '@angular/core';
import {
  SegmentCollaboratorsNazanApiService,
  SegmentCollaboratorsNazanStateService,
} from '../../services';

@Component({
  selector: 'segment-collaborators-nazan-options',
  templateUrl: './segment-collaborators-nazan-options.component.html',
  styleUrls: ['./segment-collaborators-nazan-options.component.scss'],
})
export class SegmentCollaboratorsNazanOptionsComponent {
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
    public _segmentCollaboratorsNazan: SegmentCollaboratorsNazanStateService,
    private _segmentCollaboratorsNazanApi: SegmentCollaboratorsNazanApiService
  ) {}

  handleSearch() {
    this._segmentCollaboratorsNazan.state.isVisibleForm =
      !this._segmentCollaboratorsNazan.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._segmentCollaboratorsNazan.state.isLoadingList = true;

    this._segmentCollaboratorsNazanApi
      .inventoryKardexProduct(
        this._segmentCollaboratorsNazan.state.segmentCollaboratorsNazanDTO
      )
      .subscribe({
        next: (data) => {
          this._segmentCollaboratorsNazan.state.segmentCollaboratorsNazanResponse =
            data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._segmentCollaboratorsNazan.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}
