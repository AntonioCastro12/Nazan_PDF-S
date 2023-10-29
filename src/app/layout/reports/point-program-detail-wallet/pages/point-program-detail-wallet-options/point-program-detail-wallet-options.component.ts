import { Component } from '@angular/core';
import {
  PointProgramDetailWalletApiService,
  PointProgramDetailWalletStateService,
} from '../../services';

@Component({
  selector: 'point-program-detail-wallet-options',
  templateUrl: './point-program-detail-wallet-options.component.html',
  styleUrls: ['./point-program-detail-wallet-options.component.scss'],
})
export class PointProgramDetailWalletOptionsComponent {
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
    public _pointProgramDetailWallet: PointProgramDetailWalletStateService,
    private _pointProgramDetailWalletApi: PointProgramDetailWalletApiService
  ) {}

  handleSearch() {
    this._pointProgramDetailWallet.state.isVisibleForm =
      !this._pointProgramDetailWallet.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._pointProgramDetailWallet.state.isLoadingList = true;

    this._pointProgramDetailWalletApi
      .inventoryKardexProduct(
        this._pointProgramDetailWallet.state.pointProgramDetailWalletDTO
      )
      .subscribe({
        next: (data) => {
          this._pointProgramDetailWallet.state.pointProgramDetailWalletResponse =
            data;
          this._pointProgramDetailWallet.state.pointProgramDetailWalletResponseList =
            data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._pointProgramDetailWallet.state.isLoadingList = false;
        },
      });
  }
  handleDownload() {}
  handleFavorite() {}
}
