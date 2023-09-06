export class Favorite {
  id: number = 0;
  userId: string = "";
  url: string = "";
  searchCriteria: object = {};
  createdAt: string = "";
  updatedAt: string = "";
}
export class ListFavorites {
  url: string = "";
  searchCriteria: object = {};
}
export const labelsListFavorites = {
  url: "Reporte",
  searchCriteria: "Criterio de búsqueda",
  actions: "Acciones"
}

export class ListHistoric {
  url: string = "";
  searchCriteria: object = {};
  createdAt: string = "";
  updatedAt: string = "";
}
export const labelsListHistoric = {
  url: "Reporte",
  createdAt: "Fecha de consulta"
}

export const mapUrlReport = [
  {
    url: 'sales/wholesale-sales',
    name: "Venta de Mayoreos"
  },
  {
    url: 'inventories/kardex',
    name: "Kardex de inventario"
  },
  {
    url: 'inventories/inventory-stock/resume',
    name: "Existencia en Inventario (resumen)"
  },
  {
    url: 'inventories/inventory-stock/detail',
    name: "Existencia en Inventario (detalle)"
  },
  {
    url: 'inventories/cycle-count',
    name: "Cumplimiento de conteos ciclicos"
  },
  {
    url: 'inventories/sap-xstore',
    name: "Diferencia de inventario SAP vs Xstore"
  },
  {
    url: 'inventories/pod',
    name: "Reporte de Recepción de mercancía"
  },
  {
    url: 'point-program/total-movement',
    name: "Reporte de Totales de movimiento de puntos y monedero"
  },
  {
    url: 'point-program/detail-points',
    name: "Reporte de Detalle de moviminetos de puntos y premios"
  },
  {
    url: 'point-program/detail-wallet',
    name: "Reporte de Detalle de moviminetos de monedero"
  },
  {
    url: 'sales/general-sales',
    name: "Informe general de ventas"
  },
  {
    url: 'sales/invoice-total',
    name: "Totales de facturación"
  },
  {
    url: 'sales/wholesale-sales',
    name: "Ventas al mayoreo"
  },
  {
    url: 'segments/collaborators-nazan',
    name: "Segmento Colaboradores Nazan"
  },
  {
    url: 'segments/affiliated-kipon',
    name: "Afiliados Club KIPON"
  },
]
