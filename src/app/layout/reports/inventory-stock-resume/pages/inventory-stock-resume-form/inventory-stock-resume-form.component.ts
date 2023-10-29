import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { DateTime } from 'luxon';
import {
  InventoryStockResumeDTO,
  inventoryStockResumeLabels,
} from '../../models';
import {
  InventoryStockResumeApiService,
  InventoryStockResumeStateService,
} from '../../services';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'inventory-stock-resume-form',
  templateUrl: './inventory-stock-resume-form.component.html',
  styleUrls: ['./inventory-stock-resume-form.component.scss'],
})
export class InventoryStockResumeFormComponent {
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

  inventoryStockResumeLabels = inventoryStockResumeLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryStockResume: InventoryStockResumeStateService,
    public _inventoryStockResumeApi: InventoryStockResumeApiService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._inventoryStockResume.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventoryStockResume.state.form.controls;
  }
  onSubmit() {
    this._inventoryStockResume.state.isLoadingList = true;
    let item: InventoryStockResumeDTO = new InventoryStockResumeDTO();
    let formItems = this._inventoryStockResume.state.form.value;
    item = {
      storeId: formItems.storeId.id,
    };
    this._inventoryStockResume.state.inventoryStockResumeDTO = item;

    this._inventoryStockResumeApi
      .inventoryStockResume(
        this._inventoryStockResume.state.inventoryStockResumeDTO
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this._inventoryStockResume.state.inventoryStockResumeResponse = data;
          this._inventoryStockResume.state.inventoryStockResumeResponseList =
            data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._inventoryStockResume.state.isLoadingList = false;
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
