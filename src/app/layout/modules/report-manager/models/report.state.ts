import { InventoryStockDetail, ReportList } from "./report.entity";

class BasicObjectState {
  original: ReportList = { total: 0, data: [] };
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
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      stockResume: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
        details: []
      },
      comparison: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
      },
      pod: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
      },
      sapXstore: {
        original: { total: 0, data: [] },
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
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      detailPoints: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      detailWallet: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
    };
  sales: {
    invoiceTotal: BasicObjectState,
    generalSales: BasicObjectState
  } = {
      invoiceTotal: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      generalSales: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
    };
  segments: {
    affiliatedKipon: BasicObjectState,
    collaboratorsNazan: BasicObjectState,
  } = {
      affiliatedKipon: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      collaboratorsNazan: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
    };

}
