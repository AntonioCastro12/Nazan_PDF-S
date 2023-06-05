import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OnDemandManagerApiService } from '../../service/ondemand-manager-api-service';

@Component({
  selector: 'app-ondemand-process-orders',
  templateUrl: './ondemand-process-orders.component.html',
  styleUrls: ['./ondemand-process-orders.component.scss']
})
export class OndemandProcessOrdersComponent {
  constructor(private confirmationService: ConfirmationService, private _onDemandManagerApiService: OnDemandManagerApiService, private messageService: MessageService) { }
  visible: boolean = false;
  loading: boolean = false;
  message: string = '';
  typeMessage: string = '';
  excecute() {
    this.confirmationService.confirm({
      message: 'Desea proceder?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.loading = true;
        this._onDemandManagerApiService.proccessOrders().subscribe({
          next: (data) => {
            this.typeMessage = "Completado"
            this.message = "Success"
            this.visible = true;
            this.loading = false;
          },
          error: (e) => {
            this.typeMessage = "Error"
            this.message = "Error"
            this.visible = true;
            this.loading = false;
          },
          complete: () => {
            return;
          }
        })
      },
      reject: () => {
        return;
      }
    });
  }
  show(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
}
