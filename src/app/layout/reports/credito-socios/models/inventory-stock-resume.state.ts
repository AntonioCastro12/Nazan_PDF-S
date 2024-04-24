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
  inventoryStockResumeDTO: InventoryStockResumeDTO =
    new InventoryStockResumeDTO();
  inventoryStockResumeResponse: InventoryStockResumeResponse[] = [];
  inventoryStockResumeResponseList: InventoryStockResumeResponse[] = [];
  inventoryStockDetailResponse: InventoryStockDetailResponse[] = [];
  inventoryStockDetailResponseList: InventoryStockDetailResponse[] = [];


  //datos de credito recepcion
  creditoSocioDTO:creditoSocioDTO= new creditoSocioDTO;
  customerInformationResponse: CustomerInformationResponse [] = [ ];
  accountInformation: AccountInformationResponse [] = []
  transactionsHistoryResponse: TransactionsHistoryResponse [] = []
  memberAut: AccountAutResponse [] = [];


  /**
   * variables prueba para tablas de socios
   */

  CustomerInformationResponseData: CustomerInformationResponse [] = [
    {
      no_socio:1114215091,
      nombre: 'jose',
      ap_paterno:'cano',
      ap_materno:'hernandez' 
    }
  ]

  accountInformationData: AccountInformationResponse [] = [

    {
      no_cuenta: 'HA0105001000006',
      estado: 'OPEN',
      fecha_configuracion: '2024-04-09 00:00:00.000',
      lim_credito: '10000.000000',
      cred_disponible: '10000.000000',
      saldo_pendiente: '0.000000',
      cuenta_retenida: 'no'
      }
  ]

  transactionsHistoryResponseData: TransactionsHistoryResponse [] = [
    {
      fecha_ticket: '2024-04-10 00:00:00.000',
      tienda: '105',
      no_cliente: 'HAU0105001000009',
      nombre: 'Jose Cano',
      ticket: '258671',
      tipo_movimiento:'CARGO',
      monto: '500.000000',
      forma_pago: '',
      ref_bancaria: ''
    },
    {
      fecha_ticket: '2024-04-10 00:00:00.000',
      tienda: '105',
      no_cliente: 'HAU0105001000009',
      nombre: 'Jose Cano',
      ticket: '258672',
      tipo_movimiento:'PAGO',
      monto: '-500.000000',
      forma_pago: 'DEPOSIT_BANAMEX',
      ref_bancaria: 'REFERENCIABANCARIA',
      ref_ticket: 'TICKETVENTA1',
      fecha_ref_deposito: '10/04/2024'
    }
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
