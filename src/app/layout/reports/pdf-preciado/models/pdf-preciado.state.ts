import { UntypedFormGroup } from '@angular/forms';
import { taGralDTO } from './pdf-preciado.dto';
import {
  taGralResponse
} from './pdf-preciado.response';

export class PdfPreciadoState {
  //datos de credito recepcion
  taGralDTO:taGralDTO= new taGralDTO;
  taGralResponse: taGralResponse[]=[];

  currentStore!: string;
  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  isLoadingTicket: boolean = false;
  isVisibleModal: boolean = false;
}
