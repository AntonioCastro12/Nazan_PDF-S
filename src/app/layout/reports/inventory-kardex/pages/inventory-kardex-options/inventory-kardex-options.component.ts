import { Component } from '@angular/core';
import { InventoryKardexStateService } from '../../services';

@Component({
  selector: 'inventory-kardex-options',
  templateUrl: './inventory-kardex-options.component.html',
  styleUrls: ['./inventory-kardex-options.component.scss'],
})
export class InventoryKardexOptionsComponent {
  TEMPLATE_TEXT = {
    showSearch: 'Buscar los registros',
    showChart: 'Ver gráfico',
    showRefresh: 'Renovar la lista',
    showDownload: 'Exportar registros',
    showEye: 'Mostrar registro',
    showFavorite: 'Agregar a favoritos',
  };

  showSearch: any = true;
  showChart: any = true;
  showRefresh: any = true;
  showDownload: any = true;
  showEye: any = true;
  showFavorite: any = true;

  constructor(public _inventoryKardex: InventoryKardexStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}
  handleDownload() {}
  handleFavorite() {}
}
