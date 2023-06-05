
export class LogList {
  total: number = 0;
  data: Array<LogEntity> = [];

}

export const logEntityLabels = {
  id: 'ID ',
  level: 'Nivel',
  message: 'Mensaje',
  stacktrace: 'Stacktrace',
  createdAt: 'Fecha creación',
}
export interface LogEntity {
  id: number;
  level: string;
  message: string;
  stacktrace: null;
  context: Context;
  createdAt: Date;
}

export class Context {
  PS_COMENT: string = "";
  PS_EBELN: string = "";
  ET_CUSTOMER: Et[] = [];
  ET_ITEMS: EtItem[] = [];
  ET_NOTES: EtNote[] = [];
  ET_ORDERS: EtOrder[] = [];
  ET_SHIPPING: Et[] = [];
}

export interface Et {
  REQUEST_ID: string;
  ORDER_ID: string;
  LAST_NAME: string;
  MIDDLE_NAME: string;
  FIRST_NAME: string;
  ADDRESS_1: string;
  ADDRESS_2: string;
  ADDRESS_3: string;
  ADDRESS_4: string;
  CITY: string;
  TERRITORY: string;
  POSTAL_CODE: string;
  DAY_PHONE: string;
  EVENING_PHONE: string;
  EMAIL: string;
  COUNTRY: string;
  COMPANY_NAME: string;
  CUSTOMER_NO?: string;
  ATTENTION?: string;
  REFERENCE?: string;
  VIA?: string;
}

export interface EtItem {
  REQUEST_ID: string;
  ORDER_ID: string;
  PRODUCT_ID: string;
  QUANTITY: string;
  STATUS_CODE: string;
  MESSAGE_NOTE_ID: string;
}

export interface EtNote {
  NOTE_ID: string;
  NOTES: string;
  LASTUPDATED: string;
  LASTUPDATEDBY: string;
}

export interface EtOrder {
  REQUEST_ID: string;
  ORDER_ID: string;
  CREATE_TIMESTAMP: string;
  ORIG_LOC_ID: string;
  STATUS_CODE: string;
  SHIP_VIA: string;
  SHIP_VIA_DESCR: string;
  NOTE_ID: string;
}
