import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { DateTime } from 'luxon';
import { SalesInvoiceTotalDTO, salesInvoiceTotalLabels } from '../../models';
import {
  SalesInvoiceTotalApiService,
  SalesInvoiceTotalStateService,
} from '../../services';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'sales-invoice-total-form',
  templateUrl: './sales-invoice-total-form.component.html',
  styleUrls: ['./sales-invoice-total-form.component.scss'],
})
export class SalesInvoiceTotalFormComponent {
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

  salesInvoiceTotalLabels = salesInvoiceTotalLabels;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _salesInvoiceTotal: SalesInvoiceTotalStateService,
    public _salesInvoiceTotalApi: SalesInvoiceTotalApiService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._salesInvoiceTotal.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._salesInvoiceTotal.state.form.controls;
  }
  onSubmit() {
    this._salesInvoiceTotal.state.isLoadingList = true;
    let item: SalesInvoiceTotalDTO = new SalesInvoiceTotalDTO();
    let formItems = this._salesInvoiceTotal.state.form.value;
    item = {
      storeId: formItems.storeId.id,
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._salesInvoiceTotal.state.salesInvoiceTotalDTO = item;

    this._salesInvoiceTotalApi
      .inventoryKardexProduct(
        this._salesInvoiceTotal.state.salesInvoiceTotalDTO
      )
      .subscribe({
        next: (data) => {
          this._salesInvoiceTotal.state.salesInvoiceTotalResponse = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._salesInvoiceTotal.state.isLoadingList = false;
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
