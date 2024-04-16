export class InventoryStockResumeResponse {
  store_id: number = 0;
  line: string | null = null;
  qty: number | null = null;
}

export const inventoryStockResumeResponseName = {
  store_id: 'Tienda',
  line: 'Linea',
  qty: 'Cantidad',
};

//informacion cliente
export const CustomerInformation = {
  no_socio: 'No. Socio',
  nombre: 'Nombre',
  ap_paterno: 'Apellido Paterno',
  ap_materno: 'Apellido MAterno',
};

//Informacion de cuenta
export const AccountInformation = {
  no_cuenta: 'Numero de cuenta',
  estado: 'Estado',
  fecha_conf: 'Fecha Configuracion',
  lim_credito: 'Limite de Credito',
  cred_disponible: 'Credito Disponible',
  saldo_pend: 'Saldo Pendiente',
  cuenta_ret: 'Cuenta Retenida',
  principal: 'Principal'
}

//informacion del ticket
export const ticketInformation = {
  fecha_ticket:'Fecha Ticket',
  tienda: 'Tienda',
  no_cliente: 'No. Cliente',
  nombre: 'Nombre',
  ticket: ' Ticket',
  t_movimiento: 'Tipo Movimiento',
  monto: 'Monto',
  f_pago: 'Forma Pago',
  r_bancaria: 'Referencia Bancaria',
  r_ticket: 'Referencia Ticket',
  f_r_deposito: 'Fecha referencia Deopsito' 
};

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
