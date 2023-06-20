import { LogList } from "./log.entity";
import { ReportList } from "./report.entity";

class BasicObjectState {
  list: ReportList = { total: 0, data: [] };
  filter: ReportList = { total: 0, data: [] };
  details?: [];
}


export class ReportState {
  inventory: {
    kardex: BasicObjectState
    stockResume: BasicObjectState,
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
