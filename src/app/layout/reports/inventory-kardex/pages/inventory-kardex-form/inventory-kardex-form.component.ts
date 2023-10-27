import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { kardexProductDTOname } from '../../models';
import { InventoryKardexStateService } from '../../services';
import { InventoryKardexApiService } from '../../services/inventory-kardex-api.service';

@Component({
  selector: 'inventory-kardex-form',
  templateUrl: './inventory-kardex-form.component.html',
  styleUrls: ['./inventory-kardex-form.component.scss'],
})
export class InventoryKardexFormComponent implements OnInit {
  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Reiniciar',
    labelSave: 'Guardar',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    selectStore: 'Seleccionar tienda',
  };

  kardexProductDTOname = kardexProductDTOname;

  form!: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryKardex: InventoryKardexStateService,
    public _inventoryKardexApi: InventoryKardexApiService
  ) {}

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      origin: ['', [Validators.required], []],
      startDate: ['', [Validators.required], []],
      endDate: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit() {
    this._inventoryKardex.state.kardexProductDTO = this.form.value;

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

  onReset() {}

  onCancel() {}
}
