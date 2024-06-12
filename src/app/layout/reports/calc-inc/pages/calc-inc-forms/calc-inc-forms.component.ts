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

import { predeterminadoDTO, perGeneralDTO, perDiferenciadoDTO } from '../../models';
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

  getCatalogos() {
    this._taGralStateService.state.isLoadingCatalogues = true;
    this._taServiceApi.catActuales().subscribe(

      {
        next: (data: any) => {
          this._taGralStateService.state.catActuales = data.resume;
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
      incPers: '',
      gralbase: '',
      gralsocio: '',
      DNBase: '',
      DNSocio: '',
      DIBase: '',
      DISocio: ''

    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._taGralStateService.state.form.controls;
  }

  socioSubmit() {

    let formItems = this._taGralStateService.state.form.value;
    const cadenacat = formItems.catalogos.join(',');

    switch (this._taGralStateService.state.tipoCalculo) {
      case 1: //Calculo Predeterminado
        console.log("guardar predeterminado");
        let preItems: predeterminadoDTO = new predeterminadoDTO();
        let especial = 0;

        for (let i = 0; i < formItems.incPred.length; i++) {
          if (formItems.incPred[i] === "NI") {
            especial = 1;
            formItems.incPred.splice(i, 1);
            i--; // Decrementa el índice para verificar el nuevo elemento en la posición actual
          }
        }
        let cadenaNumeros = formItems.incPred.map((num: any) => `[${num}]`).join(',');

        preItems = {
          catalogos: cadenacat,
          incremento: cadenaNumeros,
          cEspecial: especial
        }
        console.log("Predeterminado items: ", preItems);

        this._taServiceApi.calcPredeterminado(preItems).subscribe(
          {
            next: (data: any) => {
              this._taGralStateService.state.predeterminadoResponse = data;
              console.log("variable state data pred: ", this._taGralStateService.state.predeterminadoResponse);
            },
            error: (error: { erros: { message: string | undefined; }; }) => {
              this._toastr.error('Opps ha ocurrido un error', error.erros.message);
              console.error(error);
            },
            complete: () => {
            },

          }
        );



        break;

      case 2: //Personalizado General
        console.log("personalizado general");
        let perGralItem: perGeneralDTO = new perGeneralDTO();
        perGralItem = {
          catalogos: cadenacat,
          gralBase: formItems.gralbase,
          gralSocio: formItems.gralsocio
        }
        console.log("Perso Gral: ", perGralItem)
        break;

      case 3: //Personalizado diferenciado
        console.log("personalizado diferenciado");
        let perDifItem: perDiferenciadoDTO = new perDiferenciadoDTO();
        perDifItem = {
          catalogos: cadenacat,
          diBase: formItems.DIBase,
          diSocio: formItems.DISocio,
          dnBase: formItems.DNBase,
          dnSocio: formItems.DNSocio
        }
        console.log("Perso Diferenciado: ", perDifItem);
        break;

      default:
        break;
    }

  }

  onReset() {
    this.onFillForm();
  }


  predeterminado() {
    this._taGralStateService.state.tipoCalculo = 1
    this._taGralStateService.state.predeterminado = true;
  }
  personalizado() {
    this._taGralStateService.state.tipoCalculo = 2
    this._taGralStateService.state.predeterminado = false;
  }
  general() {
    this._taGralStateService.state.tipoCalculo = 2
    this._taGralStateService.state.PersonalizadoGral = true;
  }
  diferenciado() {
    this._taGralStateService.state.tipoCalculo = 3
    this._taGralStateService.state.PersonalizadoGral = false;
  }


}
