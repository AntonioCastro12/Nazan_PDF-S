import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  PointProgramDetailPointsDTO,
  pointProgramDetailPointsLabels,
} from '../../models';
import {
  PointProgramDetailPointsApiService,
  PointProgramDetailPointsStateService,
} from '../../services';

@Component({
  selector: 'point-program-detail-points-form',
  templateUrl: './point-program-detail-points-form.component.html',
  styleUrls: ['./point-program-detail-points-form.component.scss'],
})
export class PointProgramDetailPointsFormComponent {
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

  pointProgramDetailPointsLabels = pointProgramDetailPointsLabels;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _pointProgramDetailPoints: PointProgramDetailPointsStateService,
    public _pointProgramDetailPointsApi: PointProgramDetailPointsApiService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._pointProgramDetailPoints.state.form = this._formBuilder.group({
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._pointProgramDetailPoints.state.form.controls;
  }
  onSubmit() {
    this._pointProgramDetailPoints.state.isLoadingList = true;
    let item: PointProgramDetailPointsDTO = new PointProgramDetailPointsDTO();
    let formItems = this._pointProgramDetailPoints.state.form.value;
    item = {
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._pointProgramDetailPoints.state.pointProgramDetailPointsDTO = item;

    this._pointProgramDetailPointsApi
      .inventoryKardexProduct(
        this._pointProgramDetailPoints.state.pointProgramDetailPointsDTO
      )
      .subscribe({
        next: (data) => {
          console.log(data[0].NOM_CORTO);
          this._pointProgramDetailPoints.state.pointProgramDetailPointsResponse =
            data;
          this._pointProgramDetailPoints.state.pointProgramDetailPointsResponseList =
            data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._pointProgramDetailPoints.state.isLoadingList = false;
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
