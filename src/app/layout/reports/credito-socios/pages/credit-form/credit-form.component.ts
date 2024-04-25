
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
    this._creditoStateService.state.creditoSocioDTO = item;
    this._creditoStateService.state.isLoadingList = true;
    this._creditServiceApi.membershipCreditHistory(
      this._creditoStateService.state.creditoSocioDTO = item
    ).subscribe({
      next: (data: any) => {

        this._creditoStateService.state.customerInformationResponse = data['memberDesc'];

        this._creditoStateService.state.accountInformation = data['creditDesc'];

        this._creditoStateService.state.memberAut = data['memberAut'];

        this._creditoStateService.state.transactionsHistoryResponse = data['transactionHistory'];

      },
      error: (error: { erros: { message: string | undefined; }; }) => {
        this._toastr.error('Opps ha ocurrido un error', error.erros.message);
        console.error(error);
      },
      complete: () => {
        this._creditoStateService.state.isLoadingList = false;
      },
    });
  }

  onReset() {
    this.onFillForm();
  }


}
