import { InventoryStockDetail, ReportList } from "./report.entity";

class BasicObjectState {
  list: ReportList = { total: 0, data: [] };
  filter: ReportList = { total: 0, data: [] };
}
class InventoryStockResume extends BasicObjectState {
  details: InventoryStockDetail[] = [];
}

export class ReportState {
  inventory: {
    kardex: BasicObjectState
    stockResume: InventoryStockResume,
    comparison: BasicObjectState,
    pod: BasicObjectState,
    sapXstore: BasicObjectState,
  } = {
      kardex: {
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      stockResume: {
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
        details: []
      },
      comparison: {
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
      },
      pod: {
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
      },
      sapXstore: {
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
      }
    };
  pointProgram: {
    detailPoints: BasicObjectState
    detailWallet: BasicObjectState
    totalMovement: BasicObjectState
  } = {
      totalMovement: {
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      detailPoints: {
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      detailWallet: {
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
    };
  sales: {
    invoiceTotal: BasicObjectState
  } = {
      invoiceTotal: {
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
    };

}
