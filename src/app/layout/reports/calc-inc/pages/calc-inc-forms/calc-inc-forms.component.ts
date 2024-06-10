import { Component } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';

import { DateTime } from 'luxon';

import {
  CalcApiService,
  CalcStateService,
} from '../../services';

import { taGralDTO } from '../../models';
import { objectContainsValue } from '@shared/functions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'calc-inc-forms',
  templateUrl: './calc-inc-forms.component.html',
  styleUrl: './calc-inc-forms.component.scss'
})
export class CalcIncFormsComponent {

  formGroup: FormGroup | undefined | any;

  checked:boolean=true;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _taGralStateService: CalcStateService,
    public _taServiceApi: CalcApiService,
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
    console.log("ng on init");
    this.onFillForm();
    this.getCatalogos();
  }
  selectedCategory: any = null;


  getCatalogos(){
    this._taGralStateService.state.isLoadingCatalogues=true;
    this._taServiceApi.catActuales().subscribe((data:any)=>{
      this._taGralStateService.state.catActuales = data;
      console.log("Data: ", this._taGralStateService.state.catActuales);
    });
  }

  onFillForm() {
    this._taGralStateService.state.form = this._formBuilder.group({
      dama: '',
      cab: '',
      niña: '',
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._taGralStateService.state.form.controls;
  }

  socioSubmit() {
    console.log("items: ",this._taGralStateService.state.form.value );
    
  }

  onReset() {
    this.onFillForm();
  }


}
