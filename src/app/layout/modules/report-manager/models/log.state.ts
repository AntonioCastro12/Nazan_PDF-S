import { LogList } from "./log.entity";

export class LogState {
  logList: LogList = { total: 0, data: [] };
  logFilter: LogList = { total: 0, data: [] };
}
