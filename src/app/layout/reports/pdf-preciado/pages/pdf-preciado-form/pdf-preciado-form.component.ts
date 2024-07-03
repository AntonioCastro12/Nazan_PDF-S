import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';

import { DateTime } from 'luxon';

import {
  PdfPreciadoApiService,
  PdfPreciadoStateService,
} from '../../services';

import { taGralDTO } from '../../models';
import { objectContainsValue } from '@shared/functions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'pdf-preciado-form',
  templateUrl: './pdf-preciado-form.component.html',
  styleUrl: './pdf-preciado-form.component.scss'
})
export class PdfPreciadoFormComponent {

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _taGralStateService: PdfPreciadoStateService,
    public _taServiceApi: PdfPreciadoApiService,
    private route: ActivatedRoute,
    public _common: CommonStateService,
    private _toastr: ToastrService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
    this.userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
  }

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

  value = "";

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._taGralStateService.state.form = this._formBuilder.group({
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
      storeId: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._taGralStateService.state.form.controls;
  }

  buscar() {
  }


  onReset() {
    this.onFillForm();
  }

}
