
import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { DateTime } from 'luxon';
import {
  creditoSocioDTO
} from '../../models';
import {
  CreditoApiService,
  CreditoStateService,
} from '../../services';
import { objectContainsValue } from '@shared/functions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'credit-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.scss']
})
export class CreditFormComponent {
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _creditoStateService: CreditoStateService,
    public _creditServiceApi: CreditoApiService,
    private route: ActivatedRoute,
    public _common: CommonStateService,
    private _toastr: ToastrService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
    this.userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._creditoStateService.state.form = this._formBuilder.group({
      memberId: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._creditoStateService.state.form.controls;
  }

  socioSubmit() {
    
    //PRUEBA DE ENDPOINT
    this._creditoStateService.state.isLoadingList = true;
    let item: creditoSocioDTO = new creditoSocioDTO();
    // let item: string;
    let formItems = this._creditoStateService.state.form.value;
     item = {
      memberId: formItems.memberId
    }
    console.log(item);
    this._creditoStateService.state.isLoadingList = true;
    this._creditServiceApi.membershipCreditHistory(item).subscribe({
          next: (data:any) => {
            console.log(data);
          },
          error: (error: { erros: { message: string | undefined; }; }) => {
            this._toastr.error('Opps ha ocurrido un error', error.erros.message);
            console.error(error);
          },
          complete: () => {
            this._creditoStateService.state.isLoadingList = false;
          },
        });




    // this._creditoStateService.state.isLoadingList = true;
    // let item: creditoSocioDTO = new creditoSocioDTO();
    // let formItems = this._creditoStateService.state.form.value;
    //  item = {
    //   memberId: formItems.memberId
    // }

    // if (item.memberId === '1114215091') {
    //   setTimeout(() => {
    //     this._creditoStateService.state.accountInformation = this._creditoStateService.state.accountInformationData;
    //     this._creditoStateService.state.customerInformationResponse = this._creditoStateService.state.CustomerInformationResponseData;
    //     this._creditoStateService.state.transactionsHistoryResponse = this._creditoStateService.state.transactionsHistoryResponseData;
        
    //   }, 1000);
    //   setTimeout(() => {
    //     this._creditoStateService.state.isLoadingList = false;
    //   }, 1500);

    // }
    // else{ 
    //   setTimeout(() => {
    //     this._creditoStateService.state.isLoadingList = false;
    //   }, 2000);
    // }



    //Consutla anterior (Eliminar)
    // this._inventoryStockResume.state.inventoryStockResumeDTO = item;
    // this._inventoryStockResumeApi
    //   .inventoryStockResume(
    //     this._inventoryStockResume.state.inventoryStockResumeDTO
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       this._inventoryStockResume.state.inventoryStockResumeResponse = data;
    //       this._inventoryStockResume.state.inventoryStockResumeResponseList =
    //         data;
    //     },
    //     error: (error) => {
    //       this._toastr.error('Opps ha ocurrido un error', error.erros.message);
    //       console.error(error);
    //     },
    //     complete: () => {
    //       this._inventoryStockResume.state.isLoadingList = false;
    //     },
    //   });
  }

  onReset() {
    this.onFillForm();
  }


}
