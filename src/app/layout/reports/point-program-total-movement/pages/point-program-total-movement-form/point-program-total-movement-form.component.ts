import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  PointProgramTotalMovementDTO,
  PointProgramTotalMovementState,
  pointProgramTotalMovementLabels,
} from '../../models';
import {
  PointProgramTotalMovementApiService,
  PointProgramTotalMovementStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'point-program-total-movement-form',
  templateUrl: './point-program-total-movement-form.component.html',
  styleUrls: ['./point-program-total-movement-form.component.scss'],
})
export class PointProgramTotalMovementFormComponent {
  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Restaurar filtros',
    labelSave: 'Buscar',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    selectStore: 'Seleccionar tienda',
    title: 'Búsqueda por',
    subtitle: ' Rango de fecha: máximo 90 días',
    placeholderProductId: 'Código de producto',
    placeholderOrigin: 'Seleccionar origen',
  };

  showModal: boolean = false;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';

  pointProgramTotalMovementLabels = pointProgramTotalMovementLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _pointProgramTotalMovement: PointProgramTotalMovementStateService,
    public _pointProgramTotalMovementApi: PointProgramTotalMovementApiService,
    private _toastr: ToastrService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._pointProgramTotalMovement.state.form = this._formBuilder.group({
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._pointProgramTotalMovement.state.form.controls;
  }
  onSubmit() {
    this._pointProgramTotalMovement.state.isLoadingList = true;
    let item: PointProgramTotalMovementDTO = new PointProgramTotalMovementDTO();
    let formItems = this._pointProgramTotalMovement.state.form.value;
    item = {
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._pointProgramTotalMovement.state.pointProgramTotalMovementDTO = item;

    this._pointProgramTotalMovementApi
      .pointProgramTotalMovement(
        this._pointProgramTotalMovement.state.pointProgramTotalMovementDTO
      )
      .subscribe({
        next: (data) => {
          this._pointProgramTotalMovement.state.pointProgramTotalMovementResponse =
            data;
          this._pointProgramTotalMovement.state.pointProgramTotalMovementResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._pointProgramTotalMovement.state.isLoadingList = false;
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

  async onSelectRange() {
    let formItems = this._pointProgramTotalMovement.state.form.value;
    let from = DateTime.fromISO(formItems.startDate);
    let to = DateTime.fromISO(formItems.endDate);
    let diffDays = 0;
    if (from && to) {
      diffDays = from.diff(to, 'days').days;
      if (diffDays < -90) {
        await this.setErrorModal(
          'Error',
          'El rango supera el limite de 90 dias',
          '50px'
        );
      }
      if (diffDays > 0) {
        await this.setErrorModal(
          'Error',
          'La fecha final no puede ser menor a la fecha final',
          '50px'
        );
      }
    }
  }

  async setErrorModal(title: string, text: string, width: string) {
    this.titleModal = title;
    this.textModal = text;
    this.widthModal = width;
    this.showModal = true;
  }
}
