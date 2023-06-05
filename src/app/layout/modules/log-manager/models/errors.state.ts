import { ResponseErrorsList } from "./errors.entity";

export class ErrorsState {
  errorList: ResponseErrorsList = { total: 0, data: [] };
  errorFilter: ResponseErrorsList = { total: 0, data: [] };
}
