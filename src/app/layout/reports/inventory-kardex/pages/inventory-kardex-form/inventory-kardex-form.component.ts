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
  selector: 'app-inventory-kardex-form',
  templateUrl: './inventory-kardex-form.component.html',
  styleUrls: ['./inventory-kardex-form.component.scss'],
})
export class InventoryKardexFormComponent implements OnInit {
  TEMPLATE_TXT_EN = {
    pTooltipReturn: 'Return to users',
    labelReset: 'Reset',
    labelCancel: 'Cancel',
    labelSave: 'Save',
    required: 'This field is required',
  };

  TEMPLATE_TXT_ES = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Reiniciar',
    pTooltipCancel: 'Cancelar',
    labelSave: 'Guardar',
    required: 'Este campo es obligatorio',
  };

  TEMPLATE_TXT: any;

  kardexProductDTOname = kardexProductDTOname;

  form!: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryKardex: InventoryKardexStateService,
    public _inventoryKardexApi: InventoryKardexApiService
  ) {
    this.TEMPLATE_TXT = this.TEMPLATE_TXT_ES;
  }

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
