import { ID_DATA_NAME } from "src/app/shared/functions/functions";


export class ReportList {
  total: number = 0;
  data: any[] = []
}
export class InventoryKardex {
  [ID_DATA_NAME]?: number;
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
  [ID_DATA_NAME]?: number;
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
  [ID_DATA_NAME]?: number;
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
  [ID_DATA_NAME]?: number;
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

export class InventorySapXstore {
  [ID_DATA_NAME]?: number;
  store_id: number = 0;
  material: string = "";
  year: number = 0;
  sap: number = 0;
  xstore: number = 0;
  difference: number = 0;
  abs: number = 0;
}

export const inventorySapXstoreLabels = {
  store_id: 'store_id',
  material: 'material',
  year: 'year',
  sap: 'sap',
  xstore: 'xstore',
  difference: 'difference',
  abs: 'abs',
}

export class InventoryPod {
  [ID_DATA_NAME]?: number;
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
  [ID_DATA_NAME]?: number;
  "NUM SOCIO": string = "";
  "NOM CORTO": string = "";
  "NOMBRE SOCIO": string = "";
  "NIVEL": string = "";
  "PUNTOS OTROGADOS": number = 0;
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

export class PointProgramDetailWallet {
  [ID_DATA_NAME]?: number;
  "NUM SOCIO": string = "";
  "NOM CORTO": string = "";
  "NOMBRE SOCIO": string = "";
  "NIVEL": string = "";
  "MONTO": number = 0;
  "TIENDA": number = 0;
  "TRANSACCION": number = 0;
  "CAJA": number = 0;
  "FECHA ACTIVIDAD": string = "";
  "ACTIVIDAD": string = "";
}
export const pointProgramDetailWallet = {
  "NUM SOCIO": "NUM SOCIO",
  "NOM CORTO": "NOM CORTO",
  "NOMBRE SOCIO": "NOMBRE SOCIO",
  "NIVEL": "NIVEL",
  "MONTO": "MONTO",
  "TIENDA": "TIENDA",
  "TRANSACCION": "TRANSACCION",
  "CAJA": "CAJA",
  "FECHA ACTIVIDAD": "FECHA ACTIVIDAD",
  "ACTIVIDAD": "ACTIVIDAD",
}

export class PointProgramTotalMovement {
  [ID_DATA_NAME]?: number;
  "NUM SOCIO": string = "";
  "NOM CORTO": string = "";
  "NOMBRE SOCIO": string = "";
  "NIVEL": string = "";
  "PUNTOS OTROGADOS": number = 0;
  "TIENDA": number = 0;
  "TRANSACCION": number = 0;
  "CAJA": number = 0;
  "FECHA ACTIVIDAD": string = "";
  "ACTIVIDAD": string = "";
}

export const pointProgramTotalMovementLabels = {
  "NUM SOCIO": "NUM SOCIO",
  "NOM CORTO": "NOM CORTO",
  "NOMBRE SOCIO": "NOMBRE SOCIO",
  "NIVEL": "NIVEL",
  "PUNTOS OTROGADOS": "PUNTOS OTROGADOS",
  "TIENDA": "TIENDA",
  "TRANSACCION": "TRANSACCION",
  "CAJA": "CAJA",
  "FECHA ACTIVIDAD": "FECHA ACTIVIDAD",
  "ACTIVIDAD": "ACTIVIDAD"
};

export class SalesInvoiceTotal {
  [ID_DATA_NAME]?: number;
  storeId: string = "";
  businessDate: string = "";
  saleTypeSale: string = "";
  totalMoneySale: number = 0;
  totalUnitSale: number = 0;
  countInvoiceSale: number = 0;
  saleTypeReturn: string = "";
  totalMoneyReturn: number = 0;
  totalUnitReturn: number = 0;
  countInvoiceReturn: number = 0;
  saleTypeFreight: string = "";
  totalMoneyFreight: number = 0;
  totalUnitFreight: number = 0;
  countInvoiceFreight: number = 0;
  unitPercentReturn: number = 0;
  totalPercentReturn: number = 0;
}

export const salesInvoiceTotalLabels = {
  storeId: 'Tienda',
  businessDate: 'Fecha',
  countInvoiceSale: 'Cantidad facturas',
  totalUnitSale: 'Ventas unidades',
  totalUnitReturn: 'Devoluciones unidades',
  unitPercentReturn: '% Devoluciones unidades',
  totalUnitFreight: 'Cantidad fletes',
  totalMoneySale: '$ Ventas',
  totalMoneyFreight: '$ Flete',
  totalMoneyReturn: '$ Devoluciones',
  totalPercentReturn: '% Devoluciones $',
  avgSales: 'Promedio ventas $',
}

export class SalesGeneralSales {
  [ID_DATA_NAME]?: number;
  titleLine: string = "";
  countTransactions: number = 0;
  totalMoney: number = 0;
}
export const salesGeneralSalesLabels = {
  titleLine: 'Texto',
  countTransactions: 'Cantidad transacciones',
  totalMoney: 'Valor',
}

export class SegmentAffiliatedKipon {
  [ID_DATA_NAME]?: number;
  store_id: string = "";
  membership: string = "";
  cust_id: string = "";
  first_name: string = "";
  second_name: string = "";
  surname: string = "";
  lastname: string = "";
  home_phone: string = "";
  cel_phone: string = "";
  business_phone: string = "";
  email: string = "";
  birthday: string = "";
  gender: string = "";
  status: string = "";
  signup_date: string = "";
}

export const segmentAffiliatedKiponLabels = {
  store_id: "ID tienda",
  membership: "Pertenencia",
  cust_id: "ID cliente",
  first_name: "Nombre",
  second_name: "Nombre 2",
  surname: "Apellido paterno",
  lastname: "Apellido materno",
  home_phone: "Teléfono de casa",
  cel_phone: "Teléfono celular",
  business_phone: "Teléfono de trabajo",
  email: "Correo electrónico",
  birthday: "Fecha de nacimiento",
  gender: "Género",
  status: "Estado",
  signup_date: "Fecha de registro"
};

export class SegmentCollaboratorsNazan {
  [ID_DATA_NAME]?: number;
  store_id: string = "";
  segment: number = 0;
  membership: string = "";
  client_id: string = "";
  first_name: string = "";
  second_name: string = "";
  last_name: string = "";
  second_last_name: string = "";
  cellphone_number: string = "";
  mail: string = "";
  birthday: Date = new Date();
  gender: string = "";
  marital_status: string = "";
  signup_date: Date = new Date();
}

export const segmentCollaboratorsNazanLabels = {
  store_id: "ID tienda",
  segment: "Segmento",
  membership: "Membresía",
  client_id: "ID cliente",
  first_name: "Nombre",
  second_name: "Nombre 2",
  last_name: "Apellido paterno",
  second_last_name: "Apellido materno",
  cellphone_number: "Número de celular",
  mail: "Correo electrónico",
  birthday: "Fecha de nacimiento",
  gender: "Género",
  marital_status: "Estado civil",
  signup_date: "Fecha de registro"
};

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
