
export class OrderList {
  total: number = 0;
  data: Array<OrderEntity> = [];
}

export class OrderTrackingEntity {
  comment: string = "";
  date_closed: string = "";
  date_opened: string = "";
  id_sap: string = "";
  order_id: string = "";
  status: string = "";
}
export class OrderEntity {
  order_id: number = 0;
  date_created: string = '';
  date_updated: string = '';
  status: string = '';
  id_sap: string = '';
  tracking: OrderTrackingEntity[] = [];
}
export class Status {
  name: string = '';
  id: string = '';
}
export const orderTrackingEntityLabels = {
  comment: 'Comentario',
  date_closed: 'Fecha de cierre',
  date_opened: 'Fecha de apertura',
  id_sap: 'Sap ID',
  order_id: 'Orden ID',
  status: 'Estátus',
}
export const orderEntityLabels = {
  order_id: 'Orden ID ',
  date_created: 'Fecha de creación',
  date_updated: 'Fecha de actualización',
  status: 'Estátus',
  id_sap: 'Sap ID',
  tracking: 'Tracking',
}
