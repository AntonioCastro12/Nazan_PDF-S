import { Component } from '@angular/core';
import { ResponseErrors, ResponseErrorsticketEntityLabels } from '../../models/errors.entity';
import { ErrorsApiService } from '../../services/errors-api.service';
import { ErrorsStateService } from '../../services/errors-state.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent {
  NoTicket: string = '';
  NombreArticulo: string = '';
  filter: object = {};
  list: ResponseErrors[] = [];
  take: number = 10;
  skip: number = 0;
  first: number = 0;

  responseErrorsLabels = ResponseErrorsticketEntityLabels;
  constructor(private _errorsApiService: ErrorsApiService, public errorsState: ErrorsStateService) {
    this.getList();
  }
  onPageChange(event: any) {
    this.skip = event.first;
    this.take = event.rows;
    this.getList();
  }

  getList() {
    this._errorsApiService.list({
      take: this.take,
      skip: this.skip,
      where: this.filter
    }).subscribe({
      next: (data) => {
        this.errorsState.errorsState.errorList = data;
      },
      error: (e) => {
        console.log('error loading data', e)
      },
      complete: () => {
        return;
      }
    })
  }

  handleChangeFilter(e: Event, name: string) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.filter = {
      ...this.filter,
      [name]: {
        contains: filterValue
      }
    }
    this.getList();
  }

}
