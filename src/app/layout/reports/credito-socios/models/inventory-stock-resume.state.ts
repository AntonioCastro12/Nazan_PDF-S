import { UntypedFormGroup } from '@angular/forms';
import { InventoryStockResumeDTO, creditoSocioDTO } from './inventory-stock-resume.dto';
import {
  InventoryStockDetailResponse,
  InventoryStockResumeResponse,
  CustomerInformationResponse,
  AccountInformationResponse,
  TransactionsHistoryResponse,
  AccountAutResponse
} from './inventory-stock-resume.response';

export class InventoryStockResumeState {


  //datos de credito recepcion
  creditoSocioDTO:creditoSocioDTO= new creditoSocioDTO;
  customerInformationResponse: CustomerInformationResponse [] = [ ];
  accountInformation: AccountInformationResponse [] = []
  transactionsHistoryResponse: TransactionsHistoryResponse [] = []
  memberAut: AccountAutResponse [] = [];

  currentStore!: string;
  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  isVisibleModal: boolean = false;
}
