import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderState } from '../models/order.state';
import { LogState } from '../models/log.state';

@Injectable({
  providedIn: 'root'
})
export class LogStateService {
  private subject = new BehaviorSubject<LogState>(new LogState());
  private state = this.subject.asObservable();

  logState = new LogState();

  constructor() {
    this.state.subscribe((state) => (this.logState = state));
  }
}
