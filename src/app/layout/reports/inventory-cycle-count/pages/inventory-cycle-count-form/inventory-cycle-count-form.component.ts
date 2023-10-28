import { Component } from '@angular/core';
import {
  InventoryCycleCountDTO,
  inventoryCycleCountLabels,
} from '../../models';
import { countTypeOptions } from '../../models/inventory-count-type-options';
import { DateTime } from 'luxon';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import {
  InventoryCycleCountApiService,
  InventoryCycleCountStateService,
} from '../../services';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'inventory-cycle-count-form',
  templateUrl: './inventory-cycle-count-form.component.html',
  styleUrls: ['./inventory-cycle-count-form.component.scss'],
})
export class InventoryCycleCountFormComponent {
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

  inventoryCycleCountLabels = inventoryCycleCountLabels;
  countTypeOptions = countTypeOptions;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryCycleCount: InventoryCycleCountStateService,
    public _inventoryCycleCountApi: InventoryCycleCountApiService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._inventoryCycleCount.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
      type: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventoryCycleCount.state.form.controls;
  }
  onSubmit() {
    this._inventoryCycleCount.state.isLoadingList = true;
    let item: InventoryCycleCountDTO = new InventoryCycleCountDTO();
    let formItems = this._inventoryCycleCount.state.form.value;
    item = {
      storeId: formItems.storeId.id,
      startDate: formItems.startDate,
      endDate: formItems.endDate,
      type: formItems.type.value,
    };
    this._inventoryCycleCount.state.inventoryCycleCountDTO = item;

    this._inventoryCycleCountApi
      .inventoryCycleCountDTO(
        this._inventoryCycleCount.state.inventoryCycleCountDTO
      )
      .subscribe({
        next: (data) => {
          this._inventoryCycleCount.state.inventoryCycleCountResponse = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._inventoryCycleCount.state.isLoadingList = false;
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
