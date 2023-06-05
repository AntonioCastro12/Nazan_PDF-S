import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderState } from '../models/order.state';

@Injectable({
  providedIn: 'root'
})
export class ReportStateService {
  private subject = new BehaviorSubject<OrderState>(new OrderState());
  private state = this.subject.asObservable();

  reportState = new OrderState();

  constructor() {
    this.state.subscribe((state) => (this.reportState = state));
  }
}
