export class Favorite {
  id: number = 0;
  userId: string = '';
  url: string = '';
  searchCriteria: object = {};
  createdAt: string = '';
  updatedAt: string = '';
}
export class ListFavorites {
  url: string = '';
  searchCriteria: object = {};
}
export const labelsListFavorites = {
  url: 'Reporte',
  searchCriteria: 'Criterio de búsqueda',
  actions: 'Acciones',
};

export class ListHistoric {
  index: number = 0;
  url: string = '';
  searchCriteria: object = {};
  createdAt: string = '';
  updatedAt: string = '';
}
export const labelsListHistoric = {
  url: 'Reporte',
  createdAt: 'Fecha de consulta',
  actions: 'Acciones',
};

export const mapUrlReport = [
  {
    url: 'sales/wholesale-sales',
    name: 'Venta de Mayoreos',
    showPath: 'sales-wholesale/report',
  },
  {
    url: 'inventories/kardex-product',
    name: 'Kardex de inventario',
    showPath: 'inventory-kardex/report',
  },
  {
    url: 'inventories/inventory-stock/resume',
    name: 'Existencia en Inventario (resumen)',
  },
  {
    url: 'inventories/inventory-stock/detail',
    name: 'Existencia en Inventario (detalle)',
  },
  {
    url: 'inventories/cycle-count',
    name: 'Cumplimiento de Conteo',
    showPath: 'inventory-cycle-count/report',
  },
  {
    url: 'inventories/sap-xstore',
    name: 'Diferencia de inventario SAP vs Xstore',
    showPath: 'inventory-sap-xstore/report',
  },
  {
    url: 'inventories/pod',
    name: 'Reporte de Recepción de mercancía',
  },
  {
    url: 'point-program/total-movement',
    name: 'General mov. puntos y monedero',
    showPath: 'point-program-total-movement/report',
  },
  {
    url: 'point-program/detail-points',
    name: 'Detalle mov. puntos y premios',
    showPath: 'point-program-detail/report',
  },
  {
    url: 'point-program/detail-wallet',
    name: 'Detalle mov. puntos y monedero',
    showPath: 'point-program-detail-wallet/report',
  },
  {
    url: 'sales/general-sales',
    name: 'Informe general de ventas',
  },
  {
    url: 'sales/invoice-total',
    name: 'Totales de facturación',
  },
  {
    url: 'segments/collaborators-nazan',
    name: 'Colaboradores Nazan',
    showPath: 'segment-collaborators-nazan/report',
  },
  {
    url: 'segments/affiliated-kipon',
    name: 'Afiliados Club KIPON',
    showPath: 'segment-affiliated-kipon/report',
  },
];
