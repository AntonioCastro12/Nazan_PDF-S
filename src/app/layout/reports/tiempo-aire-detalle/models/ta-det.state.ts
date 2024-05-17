import { UntypedFormGroup } from '@angular/forms';
import { taGralDTO } from './ta-det.dto';
import {
  taGralResponse
} from './ta-det.response';

export class TaGralResumeState {


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
