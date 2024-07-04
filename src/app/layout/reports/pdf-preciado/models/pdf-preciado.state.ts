import { UntypedFormGroup } from '@angular/forms';
import { taGralDTO } from './pdf-preciado.dto';
import {
  taGralResponse
} from './pdf-preciado.response';
import { SafePipe} from '../safe.pipe';

interface ExcelData {
  ID: string;
  PRICE: string;
}

export class PdfPreciadoState {

   // Variable que se le asigna el archivo pdf
 public pdf:File | null =null;
 // Variable que se le asigna el archivo excel
 public excel:File | null =null;

 //Variable para mostrar el pdf modificado
 modifiedPdfUrl: string | null = null;

 //variable para accesar a los datos del excel ID-codigoInternet   PRICE-Precio
 rows: ExcelData[] = [ { ID: "Find", PRICE: "Find3" }];

  currentStore!: string;
  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  isLoadingTicket: boolean = false;
  isVisibleModal: boolean = false;
}
