import { UntypedFormGroup } from '@angular/forms';
import { taGralDTO } from './calc-inc.dto';
import {
  catActuales,
  taGralResponse
} from './calc-inc.response';

export class TaGralResumeState {

  catActuales: catActuales[] = [];


  //datos de credito recepcion
  taGralDTO:taGralDTO= new taGralDTO;
  taGralResponse: taGralResponse[]=[];

  currentStore!: string;
  form!: UntypedFormGroup;

  isLoadingCatalogues: boolean = false;
  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  isLoadingTicket: boolean = false;
  isVisibleModal: boolean = false;
}
