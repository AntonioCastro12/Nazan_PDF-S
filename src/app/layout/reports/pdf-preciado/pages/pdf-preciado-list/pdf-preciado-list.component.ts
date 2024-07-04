import { Component } from '@angular/core';
import { PdfPreciadoApiService, PdfPreciadoStateService } from '../../services';

@Component({
  selector: 'pdf-preciado-list',
  templateUrl: './pdf-preciado-list.component.html',
  styleUrl: './pdf-preciado-list.component.scss'
})
export class PdfPreciadoListComponent {

  constructor(
    public _taGralStateService: PdfPreciadoStateService,
    public _taServiceApi: PdfPreciadoApiService,
  ) { }


}
