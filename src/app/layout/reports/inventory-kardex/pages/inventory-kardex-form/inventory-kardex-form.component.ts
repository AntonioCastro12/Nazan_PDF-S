import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { kardexProductDTOname, originOptions } from '../../models';
import { InventoryKardexStateService } from '../../services';
import { InventoryKardexApiService } from '../../services/inventory-kardex-api.service';
import { DateTime } from 'luxon';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'inventory-kardex-form',
  templateUrl: './inventory-kardex-form.component.html',
  styleUrls: ['./inventory-kardex-form.component.scss'],
})
export class InventoryKardexFormComponent implements OnInit {
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

  kardexProductDTOname = kardexProductDTOname;
  originOptions = originOptions;
  today = DateTime.now().toFormat('dd/LL/yyyy');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryKardex: InventoryKardexStateService,
    public _inventoryKardexApi: InventoryKardexApiService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._inventoryKardex.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      productId: ['', [Validators.required], []],
      origin: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventoryKardex.state.form.controls;
  }
  onSubmit() {
    this._inventoryKardex.state.kardexProductDTO = this._inventoryKardex.state.form.value;

    this._inventoryKardexApi
      .inventoryKardexProduct(this._inventoryKardex.state.kardexProductDTO)
      .subscribe({
        next: (data) => {
          this._inventoryKardex.state.kardexProductResponse = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
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
