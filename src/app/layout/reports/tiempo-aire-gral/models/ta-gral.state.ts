import { UntypedFormGroup } from '@angular/forms';
import { taGralDTO } from './ta-gral.dto';
import {
  CustomerInformationResponse,
  AccountInformationResponse,
  TransactionsHistoryResponse,
  TicketResumeItemResponse,
  TicketResumeTndrResponse,
  AccountAutResponse
} from './ta-gral.response';

export class TaGralResumeState {


  //datos de credito recepcion
  taGralDTO:taGralDTO= new taGralDTO;
  customerInformationResponse: CustomerInformationResponse [] = [ ];

  accountInformation: AccountInformationResponse [] = []
  transactionsHistoryResponse: TransactionsHistoryResponse [] = []
  memberAut: AccountAutResponse [] = [];

  //ticket detail response
  ticketResumeItemResponse: TicketResumeItemResponse [] = [];
  ticketResumeTndrResponse: TicketResumeTndrResponse [] = [];


  currentStore!: string;
  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  isLoadingTicket: boolean = false;
  isVisibleModal: boolean = false;
}
