import { Component } from '@angular/core';
import {
  CreditoApiService,
  CreditoStateService,
} from '../../services';
import { inventoryStockResumeResponseName, CustomerInformation, AccountInformation, TicketInformation, membersAut, TicketResumeItem, TicketResumeTndr, TicketDetailDTO } from '../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent {

  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  inventoryStockResumeResponseName = inventoryStockResumeResponseName;
  customerInformation = CustomerInformation;
  accountInformation = AccountInformation;
  ticketInformation = TicketInformation;
  memberAut = membersAut;
  ticketResumeItem = TicketResumeItem;
  ticketResumeTndr = TicketResumeTndr;


  searchText = '';
  isLoading: boolean = false;
  visible: boolean = false;
  ticketSelected: string = '';

  constructor(
    public _creditoStateService: CreditoStateService,
    public _creditoServiceApi: CreditoApiService,

    // public _inventoryStockResume: CreditoStateService,
    // public _inventoryStockResumeApi: CreditoApiService

    private _toastr: ToastrService
  ) { }

  ticketResume(tienda:string, fecha_ticket:string, ticket:string, caja: string) {

    let item: TicketDetailDTO = new TicketDetailDTO();
    item={
      store: Number(tienda),
      ticketNumber: Number(ticket),
      date:fecha_ticket.replace(/-/g, ""),
      cashRegister: Number(caja)
    }

    this._creditoStateService.state.ticketResumeItemResponse = [];
        this._creditoStateService.state.ticketResumeTndrResponse = [];
        this._creditoStateService.state.isLoadingTicket = true;
  

    this._creditoServiceApi.ticketDetail(item).subscribe({
      
      next: (data: any) => {
        console.log("Data recibida: ",data);
        this._creditoStateService.state.ticketResumeItemResponse = data['item'];
        this._creditoStateService.state.ticketResumeTndrResponse = data['tndr'];
        this._creditoStateService.state.isLoadingTicket = false;
        
        

      },
      error: (error: { erros: { message: string | undefined; }; }) => {
        this._toastr.error('Opps ha ocurrido un error', error.erros.message);
        this._creditoStateService.state.isLoadingTicket = false;
        console.error(error);
      },
      complete: () => {
        this._creditoStateService.state.isLoadingTicket = false;
      },
    });
    this.visible = true;
    this.ticketSelected = `Ticket # ${ticket}`;
  }


  handleSearch() { }
  handleChart() { }
  handleRefresh() { }

  handleDownload() { }
  handleFavorite() { }

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  isDateOlderThanTenDays(fecha: string): boolean {
    const fechaTicket = new Date(fecha);
    const hoy = new Date();
    const diferenciaEnMs = hoy.getTime() - fechaTicket.getTime();
    const diferenciaEnDias = Math.floor(diferenciaEnMs / (1000 * 60 * 60 * 24));
    return diferenciaEnDias > 20;
  }


}
