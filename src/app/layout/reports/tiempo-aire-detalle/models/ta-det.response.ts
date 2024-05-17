export class airTimeDetailResonpse {
  rtl_loc_id: number = 0;
  business_date: null | string | undefined= null;
  wkstn_id: number = 0;
  trans_seq: number = 0;
  quantity: number = 0;
  item_id: null | string = null;
  item_desc: null | string = null;
  total: null | string = null;
  employee_id: number = 0;
}

export const TaDetResume: any[] = [
  'Fecha',
  'Tienda',
  'Descripción',
  'Id',
  'Cantidad',
  'Total',
  'No. Empleado',
  'Nombre',
  'wkstn_id',
  'transacción'
]