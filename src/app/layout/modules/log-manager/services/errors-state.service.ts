import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorsState } from '../models/errors.state';

@Injectable({
  providedIn: 'root'
})
export class ErrorsStateService {
  private subject = new BehaviorSubject<ErrorsState>(new ErrorsState());
  private state = this.subject.asObservable();

  errorsState = new ErrorsState();

  constructor() {
    this.state.subscribe((state) => (this.errorsState = state));
  }
}
