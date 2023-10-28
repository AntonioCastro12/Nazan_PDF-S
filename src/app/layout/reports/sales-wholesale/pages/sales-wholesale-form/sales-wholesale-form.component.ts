import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  SalesWholesaleApiService,
  SalesWholesaleStateService,
} from '../../services';
import { SalesWholesaleDTO, salesWholesaleLabels } from '../../models';

@Component({
  selector: 'sales-wholesale-form',
  templateUrl: './sales-wholesale-form.component.html',
  styleUrls: ['./sales-wholesale-form.component.scss'],
})
export class SalesWholesaleFormComponent {
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

  salesWholesaleLabels = salesWholesaleLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _salesWholesale: SalesWholesaleStateService,
    public _salesWholesaleApi: SalesWholesaleApiService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._salesWholesale.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._salesWholesale.state.form.controls;
  }
  onSubmit() {
    this._salesWholesale.state.isLoadingList = true;
    let item: SalesWholesaleDTO = new SalesWholesaleDTO();
    let formItems = this._salesWholesale.state.form.value;
    item = {
      storeId: formItems.storeId.id,
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._salesWholesale.state.salesWholesaleDTO = item;

    this._salesWholesaleApi
      .inventoryKardexProduct(this._salesWholesale.state.salesWholesaleDTO)
      .subscribe({
        next: (data) => {
          this._salesWholesale.state.salesWholesaleResponse = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._salesWholesale.state.isLoadingList = false;
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
