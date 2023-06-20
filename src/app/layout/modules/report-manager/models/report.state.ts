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
  } = {
      kardex: {
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      stockResume: {
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
        details: []
      }
    };

}
