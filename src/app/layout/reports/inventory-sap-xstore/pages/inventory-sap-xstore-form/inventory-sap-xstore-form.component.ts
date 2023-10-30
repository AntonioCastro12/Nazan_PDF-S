import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  InventorySapXstoreApiService,
  InventorySapXstoreApstateService,
} from '../../services';
import { InventorySapXstoreDTO, inventorySapXstoreLabels } from '../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-sap-xstore-form',
  templateUrl: './inventory-sap-xstore-form.component.html',
  styleUrls: ['./inventory-sap-xstore-form.component.scss'],
})
export class InventorySapXstoreFormComponent {
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

  inventorySapXstoreLabels = inventorySapXstoreLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventorySapXstoreAp: InventorySapXstoreApstateService,
    public _inventorySapXstoreApi: InventorySapXstoreApiService,
    private _toastr: ToastrService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._inventorySapXstoreAp.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      productId: ['', [Validators.required], []],
      origin: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventorySapXstoreAp.state.form.controls;
  }
  onSubmit() {
    this._inventorySapXstoreAp.state.isLoadingList = true;

    this._inventorySapXstoreApi.inventorySapXstore().subscribe({
      next: (data) => {
        this._inventorySapXstoreAp.state.inventorySapXstoreResponse = data;
        this._inventorySapXstoreAp.state.inventorySapXstoreResponseList = data;
      },
      error: (error) => {
        this._toastr.error('Opps ha ocurrido un error', error.erros.message);
        console.error(error);
      },
      complete: () => {
        this._inventorySapXstoreAp.state.isLoadingList = false;
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
