import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import { SalesGeneralSalesDTO, salesGeneralSalesLabels } from '../../models';
import {
  SalesGeneralSalesApiService,
  SalesGeneralSalesStateService,
} from '../../services';

@Component({
  selector: 'sales-general-sales-form',
  templateUrl: './sales-general-sales-form.component.html',
  styleUrls: ['./sales-general-sales-form.component.scss'],
})
export class SalesGeneralSalesFormComponent {
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

  salesGeneralSalesLabels = salesGeneralSalesLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _salesGeneralSales: SalesGeneralSalesStateService,
    public _salesGeneralSalesApi: SalesGeneralSalesApiService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._salesGeneralSales.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      businessDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._salesGeneralSales.state.form.controls;
  }
  onSubmit() {
    this._salesGeneralSales.state.isLoadingList = true;
    let item: SalesGeneralSalesDTO = new SalesGeneralSalesDTO();
    let formItems = this._salesGeneralSales.state.form.value;
    item = {
      storeId: formItems.storeId.id,
      businessDate: formItems.businessDate,
    };
    this._salesGeneralSales.state.salesGeneralSalesDTO = item;

    this._salesGeneralSalesApi
      .inventoryKardexProduct(
        this._salesGeneralSales.state.salesGeneralSalesDTO
      )
      .subscribe({
        next: (data) => {
          this._salesGeneralSales.state.salesGeneralSalesResponse =
            data.sales.data;
          this._salesGeneralSales.state.salesGeneralSalesResponseList =
            data.sales.data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._salesGeneralSales.state.isLoadingList = false;
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
