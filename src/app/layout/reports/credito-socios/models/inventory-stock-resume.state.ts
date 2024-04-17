import { UntypedFormGroup } from '@angular/forms';
import { InventoryStockResumeDTO } from './inventory-stock-resume.dto';
import {
  InventoryStockDetailResponse,
  InventoryStockResumeResponse,
  CustomerInformationResponse,
  AccountInformationResponse,
  TransactionsHistoryResponse
} from './inventory-stock-resume.response';

export class InventoryStockResumeState {
  inventoryStockResumeDTO: InventoryStockResumeDTO =
    new InventoryStockResumeDTO();
  inventoryStockResumeResponse: InventoryStockResumeResponse[] = [];
  inventoryStockResumeResponseList: InventoryStockResumeResponse[] = [];
  inventoryStockDetailResponse: InventoryStockDetailResponse[] = [];
  inventoryStockDetailResponseList: InventoryStockDetailResponse[] = [];


  /**
   * variables prueba para tablas de socios
   */

  customerInformationResponse: CustomerInformationResponse [] = [
    {
      no_socio:1114215091,
      nombre: 'jose',
      ap_paterno:'cano',
      ap_materno:'hernandez' 
    }
  ];

  accountInformation: AccountInformationResponse [] = [
    {
    no_cuenta: 'HA0105001000006',
    estado: 'OPEN',
    fecha_configuracion: '2024-04-09 00:00:00.000',
    lim_credito: '10000.000000',
    cred_disponible: '10000.000000',
    saldo_pendiente: '0.000000',
    cuenta_retenida: 'no',
    principal:'si'
    }
  ]

  transactionsHistoryResponse: TransactionsHistoryResponse [] = [

  ]


  /**
   * variables prueba para tablas de socios
   */

  currentStore!: string;
  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  isVisibleModal: boolean = false;
}
