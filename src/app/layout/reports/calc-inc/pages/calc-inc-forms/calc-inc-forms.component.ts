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
  value = "";

  selectedCategory: any = null;
  formGroup: FormGroup | undefined | any;
  checked: boolean = true;
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

  ngOnInit(): void {
    console.log("ng on init");
    this.onFillForm();
    this.getCatalogos();
  }



  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Restaurar filtros',
    labelSave: 'Calcular',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    selectStore: 'Seleccionar tienda',
    title: 'Búsqueda por',
    placeholderProductId: 'Código de producto',
    placeholderOrigin: 'Seleccionar origen',
  };

  pizza: string[] = [];

  


  getCatalogos() {
    this._taGralStateService.state.isLoadingCatalogues = true;
    this._taServiceApi.catActuales().subscribe(

     { next: (data: any) => {
      this._taGralStateService.state.catActuales = data.resume;
        console.log("Data: ", this._taGralStateService.state.catActuales);
      },
      error: (error: { erros: { message: string | undefined; }; }) => {
        this._toastr.error('Opps ha ocurrido un error', error.erros.message);
        console.error(error);
        this._taGralStateService.state.isLoadingCatalogues = false;
      },
      complete: () => {
        this._taGralStateService.state.isLoadingCatalogues = false;
      },

    }
    );
  }

  onFillForm() {
    this._taGralStateService.state.form = this._formBuilder.group({
      catalogos: '',
      incPred: '',
      incPers: ''
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._taGralStateService.state.form.controls;
  }

  socioSubmit() {
    console.log("items: ", this._taGralStateService.state.form.value);

  }

  onReset() {
    this.onFillForm();
  }


  predeterminado(){
    this._taGralStateService.state.predeterminado=true;
  }
  personalizado(){
    this._taGralStateService.state.predeterminado=false;
  }
  general(){
    this._taGralStateService.state.PersonalizadoGral=true;
  }
  diferenciado(){
    this._taGralStateService.state.PersonalizadoGral=false;
  }


}
