import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PdfPreciadoState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PdfPreciadoStateService {
  private subject = new BehaviorSubject<PdfPreciadoState>(
    new PdfPreciadoState()
  );
  private state$ = this.subject.asObservable();

  state = new PdfPreciadoState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
