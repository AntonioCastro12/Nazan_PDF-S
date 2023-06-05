import { Injectable } from '@angular/core';

// vendor
import { BehaviorSubject } from 'rxjs';
import { LayoutState } from '../models/layout.state';

/************************************************* */

@Injectable({
  providedIn: 'root',
})
export class LayoutStateService {
  private subject = new BehaviorSubject<LayoutState>(new LayoutState());
  state = this.subject.asObservable();

  layoutState = new LayoutState();

  constructor() {
    this.state.subscribe((state) => (this.layoutState = state));
  }
}
