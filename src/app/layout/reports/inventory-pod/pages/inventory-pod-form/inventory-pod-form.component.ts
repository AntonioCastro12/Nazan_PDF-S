import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import { InventoryPodDTO, inventoryPodLabels } from '../../models';
import {
  InventoryPodApiService,
  InventoryPodStateService,
} from '../../services';

@Component({
  selector: 'inventory-pod-form',
  templateUrl: './inventory-pod-form.component.html',
  styleUrls: ['./inventory-pod-form.component.scss'],
})
export class InventoryPodFormComponent {
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

  inventoryPodLabels = inventoryPodLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryPod: InventoryPodStateService,
    public _inventoryPodApi: InventoryPodApiService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._inventoryPod.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      days: [30, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventoryPod.state.form.controls;
  }
  onSubmit() {
    this._inventoryPod.state.isLoadingList = true;
    let item: InventoryPodDTO = new InventoryPodDTO();
    let formItems = this._inventoryPod.state.form.value;
    item = {
      storeId: formItems.storeId.id,
      days: formItems.days,
    };
    this._inventoryPod.state.inventoryPodDTO = item;

    this._inventoryPodApi
      .inventoryPod(this._inventoryPod.state.inventoryPodDTO)
      .subscribe({
        next: (data) => {
          this._inventoryPod.state.inventoryPodResponse = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._inventoryPod.state.isLoadingList = false;
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
