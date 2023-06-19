import { LogList } from "./log.entity";
import { ReportList } from "./report.entity";

class BasicObjectState {
  list: ReportList = { total: 0, data: [] };
  filter: ReportList = { total: 0, data: [] };
}
class KardexState {
  kardex: BasicObjectState = {
    list: { total: 0, data: [] },
    filter: { total: 0, data: [] }
  };
}


export class ReportState {
  inventory: KardexState = {
    kardex: {
      list: { total: 0, data: [] },
      filter: { total: 0, data: [] }
    }
  };

}
