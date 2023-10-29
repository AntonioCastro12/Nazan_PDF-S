import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  PointProgramDetailWalletDTO,
  pointProgramDetailWalletLabels,
} from '../../models';
import {
  PointProgramDetailWalletApiService,
  PointProgramDetailWalletStateService,
} from '../../services';

@Component({
  selector: 'point-program-detail-wallet-form',
  templateUrl: './point-program-detail-wallet-form.component.html',
  styleUrls: ['./point-program-detail-wallet-form.component.scss'],
})
export class PointProgramDetailWalletFormComponent {
  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Restaurar filtros',
    labelSave: 'Buscar',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    selectStore: 'Seleccionar tienda',
    title: 'Búsqueda por',
    placeholderProductId: 'Código de producto',
    placeholderOrigin: 'Seleccionar origen',
  };

  pointProgramDetailWalletLabels = pointProgramDetailWalletLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _pointProgramDetailWallet: PointProgramDetailWalletStateService,
    public _pointProgramDetailWalletApi: PointProgramDetailWalletApiService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._pointProgramDetailWallet.state.form = this._formBuilder.group({
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._pointProgramDetailWallet.state.form.controls;
  }
  onSubmit() {
    this._pointProgramDetailWallet.state.isLoadingList = true;
    let item: PointProgramDetailWalletDTO = new PointProgramDetailWalletDTO();
    let formItems = this._pointProgramDetailWallet.state.form.value;
    item = {
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._pointProgramDetailWallet.state.pointProgramDetailWalletDTO = item;

    this._pointProgramDetailWalletApi
      .inventoryKardexProduct(
        this._pointProgramDetailWallet.state.pointProgramDetailWalletDTO
      )
      .subscribe({
        next: (data) => {
          console.log(data[0]);
          this._pointProgramDetailWallet.state.pointProgramDetailWalletResponse =
            data;
          this._pointProgramDetailWallet.state.pointProgramDetailWalletResponseList =
            data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._pointProgramDetailWallet.state.isLoadingList = false;
        },
      });
  }

  onReset() {
    this.onFillForm();
  }

  filterCountry(event: any) {
    if (event.query == '') {
      this.results = this.storeList;
    } else {
      this.results = this.storeList.filter((item: any) =>
        objectContainsValue(item, event.query)
      );
    }
  }
}
