export class InventoryKardex {
  store_id: number = 0;
  trans_seq: string = "";
  ws_id: string = "";
  create_date: Date | null = null;;
  origin_bucket: string = "";
  destiny_bucket: string = "";
  action_code: string = "";
  item_id: string = "";
  description: string = "";
  document: string = "";
  qty: number = 0;
  on_hand: number = 0;
  time_trans: Date | null = null;
  on_order: number = 0;
}

export class InventoryStockResume {
  line: string = ""
  qty: number = 0;
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
