

export class ReportList {
  total: number = 0;
  data: any[] = []
}
export class InventoryKardex {
  store_id: number = 0;
  trans_seq: string = "";
  ws_id: string = "";
  create_date: string = "null";
  origin_bucket: string = "";
  destiny_bucket: string = "";
  action_code: string = "";
  item_id: string = "";
  description: string = "";
  document: string = "";
  qty: number = 0;
  on_hand: number = 0;
  time_trans: string = "";
  on_order: number = 0;
}

export const inventoryKardexLabels = {
  store_id: 'Tienda',
  trans_seq: 'Transacción',
  create_date: 'Creación',
  origin_bucket: 'Bloque origen',
  destiny_bucket: 'Bloque destino',
  action_code: 'Acción',
  item_id: 'Artículo',
  sku: 'SKU',
  document: 'Documento',
  qty: 'Cantidad'
}

export const inventoryStockResumeLabels = {
  store_id: 'Tienda',
  line: 'Linea',
  qty: 'Cantidad'
}

export class InventoryStockResume {
  line: string = ""
  qty: number = 0;
}


export const inventoryStockDetailLabels = {
  sku: 'SKU',
  createDate: 'Fecha',
  line: 'línea',
  description: 'Descripción',
  qty: 'Cantidad'
}

export class InventoryStockDetail {
  storeId: string = "";
  itemId: string = "";
  sku: string = "";
  description: string = "";
  department: string = "";
  line: string = "";
  family: string = "";
  subFamily: string = "";
  size: string = "";
  block: string = "";
  qty: number = 0;
  createDate: string = "";
  updateDate: string = "";
  userUpdate: string = "";
}

export class InventoryComparison {
  productId: string = "";
  storeId: string = "";
  xstore_qty: string = "";
  xcenter_qty: string = "";
  atg_qty: string = "";
  orderbroker_qty: string = "";
}

export const inventoryComparisonLabels = {
  productId: 'Producto',
  storeId: 'Tienda',
  xstore_qty: 'Cantidad xStore',
  xcenter_qty: 'Cantidad xCenter',
  atg_qty: 'Cantidad ATG',
  orderbroker_qty: 'Cantidad Order-Broker',
}

export class InventoryPod {
  T_ORIGEN: string = '';
  NOMBRE_TDA_ORIGEN: string = '0';
  T_DESTINO: number = 0
  L_EMBARQUE: string = ''
  TIPO_EMBARQUE: string = ''
  FEC_CREA_SISTEMA: string = ''
  FEC_HORA_POD: string = ''
  FEC_HORA_CIERRE: string = '';
  TIEMPO_HRS: number = 0;
  ESTATUS: string = ''
}

export const inventoryPodLabels = {
  T_ORIGEN: 'T_ORIGEN',
  NOMBRE_TDA_ORIGEN: 'NOMBRE_TDA_ORIGEN',
  T_DESTINO: 'T_DESTINO',
  L_EMBARQUE: 'L_EMBARQUE',
  TIPO_EMBARQUE: 'TIPO_EMBARQUE',
  FEC_CREA_SISTEMA: 'FEC_CREA_SISTEMA',
  FEC_HORA_POD: 'FEC_HORA_POD',
  FEC_HORA_CIERRE: 'FEC_HORA_CIERRE',
  TIEMPO_HRS: 'TIEMPO_HRS',
  ESTATUS: 'ESTATUS',
}

export class PointProgramDetailPoints {
  "NUM SOCIO": string = "";
  "NOM CORTO": string = "";
  "NOMBRE SOCIO": string = "";
  "NIVEL": string = "";
  "PUNTOS OTORGADOS": number = 0;
  "TIENDA": number = 0;
  "TRANSACCION": number = 0;
  "CAJA": number = 0;
  "FECHA ACTIVIDAD": string = "";
  "ACTIVIDAD": string = "";
}
export const pointProgramDetailPointsLabels = {
  "NUM SOCIO": "NUM SOCIO",
  "NOM CORTO": "NOM CORTO",
  "NOMBRE SOCIO": "NOMBRE SOCIO",
  "NIVEL": "NIVEL",
  "PUNTOS OTORGADOS": "PUNTOS OTORGADOS",
  "TIENDA": "TIENDA",
  "TRANSACCION": "TRANSACCION",
  "CAJA": "CAJA",
  "FECHA ACTIVIDAD": "FECHA ACTIVIDAD",
  "ACTIVIDAD": "ACTIVIDAD",
}

class ApiErrorDetail {
  path: string = "";
  method: string = "";
  message: string = "";
  timestamp: string = "";
  parameters: object = {};
}

export class ApiErrorResponse {
  code: number = 0;
  name: string = "";
  errors: ApiErrorDetail[] = []
}

export class InventoryCycleCount {
}

export class SalesInvoiceTotalReturns {
  saleTypeReturn: string = "";
  storeId: string = "";
  businessDate: string = "";
  totalMoneyReturn: number = 0;
  totalUnitReturn: number = 0;
  countInvoiceReturn: number = 0;
}
export class SalesInvoiceTotalSales {
  saleTypeSale: string = "";
  storeId: string = "";
  businessDate: string = "";
  totalMoneySale: number = 0;
  totalUnitSale: number = 0;
  countInvoiceSale: number = 0;
}
export class SalesInvoiceTotal {
  sales: SalesInvoiceTotalSales | null = null;
  returns: SalesInvoiceTotalReturns | null = null;
}
