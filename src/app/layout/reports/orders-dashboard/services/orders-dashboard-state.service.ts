import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

class OrdersDashboardState {}

@Injectable({
  providedIn: 'root',
})
export class OrdersDashboardStateService {
  private subject = new BehaviorSubject<OrdersDashboardState>(
    new OrdersDashboardState()
  );
  private state$ = this.subject.asObservable();

  state = new OrdersDashboardState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
