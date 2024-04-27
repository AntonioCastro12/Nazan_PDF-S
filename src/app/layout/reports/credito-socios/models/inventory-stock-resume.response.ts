export class InventoryStockResumeResponse {
  store_id: number = 0;
  line: string | null = null;
  qty: number | null = null;
}

/* ----------------------------------------
----clases para recibir datos de socios----
-----------------------------------------*/
export class CustomerInformationResponse {
  no_socio:number = 0;
  nombre: string | null = null;
  ap_paterno: string | null = null;
  ap_materno: string | null = null;
}

export class AccountInformationResponse {
  no_cuenta: string | null = null;
  estado: string | null = null;
  fecha_configuracion: string | null | undefined = null;
  lim_credito: string | null = null;
  cred_disponible: string | null = null;
  saldo_pendiente: string | null = null;
  cuenta_retenida: string | null = null;
} 

export class AccountAutResponse {
	principal: string | null = null;
	no_cliente: string | null = null;
	nombre: string | null = null;
}

export class TransactionsHistoryResponse{
  fecha_ticket: string | null | undefined= null;
  tienda: string | null = null;
  no_cliente: string | null = null;
  nombre: string | null = null;
  ticket: string | null = null;
  tipo_movimiento: string | null = null;
  monto: string | null = null;
  forma_pago?:string | null = null;
  ref_bancaria?: string | null = null;
  ref_ticket?: string | null = null;
  fecha_ref_deposito?: string | null = null;
}



export const inventoryStockResumeResponseName = {
  store_id: 'Tienda',
  line: 'Linea',
  qty: 'Cantidad',
};

//informacion socio
export const CustomerInformation: any[] = [
  'No. Socio',
  'Nombre'
]

export const AccountInformation: any[] = [
  'Numero de cuenta',
  'Estado',
  'Fecha de Apertura',
  'Límite de Crédito',
  'Crédito Disponible',
  'Saldo Pendiente',
  'Cuenta Retenida'
]

export const membersAut: any [] = [
  'No. cliente',
	'Nombre',
  'Principal'
]
//informacion movimientos
export const TicketInformation: any[] = [
  'Fecha Ticket',
  'Tienda',
  'No. Cliente',
  'Nombre',
  ' Ticket',
  'Tipo Movimiento',
  'Monto',
  'Forma Pago',
  'Referencia Bancaria',
  'Referencia Ticket',
  'Fecha referencia Deposito'
]

export class InventoryStockDetailResponse {
  storeId: string = '';
  itemId: string = '';
  sku: string = '';
  description: string = '';
  department: string = '';
  line: string = '';
  family: string = '';
  subFamily: string = '';
  size: string = '';
  block: string = '';
  qty: number = 0;
  createDate: string = '';
}

export const InventoryStockDetailResponseName = {
  storeId: 'Tienda',
  itemId: 'Articulo',
  sku: 'Sku',
  description: 'Descripción',
  department: 'Departamento',
  line: 'Línea',
  family: 'Familia',
  subFamily: 'Sub_Familia',
  size: 'Talla',
  block: 'Bloque',
  qty: 'Cantidad',
  createDate: 'Fecha',
};
