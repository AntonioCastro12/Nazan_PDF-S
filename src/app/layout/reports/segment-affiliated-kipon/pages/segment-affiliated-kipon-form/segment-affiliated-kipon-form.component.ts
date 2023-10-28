import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { DateTime } from 'luxon';
import {
  SegmentAffiliatedKiponDTO,
  segmentAffiliatedKiponLabels,
} from '../../models';
import { objectContainsValue } from '@shared/functions';
import {
  SegmentAffiliatedKiponApiService,
  SegmentAffiliatedKiponStateService,
} from '../../services';

@Component({
  selector: 'segment-affiliated-kipon-form',
  templateUrl: './segment-affiliated-kipon-form.component.html',
  styleUrls: ['./segment-affiliated-kipon-form.component.scss'],
})
export class SegmentAffiliatedKiponFormComponent {
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

  segmentAffiliatedKiponLabels = segmentAffiliatedKiponLabels;
  //originOptions = originOptions;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _segmentAffiliatedKipon: SegmentAffiliatedKiponStateService,
    public _segmentAffiliatedKiponApi: SegmentAffiliatedKiponApiService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._segmentAffiliatedKipon.state.form = this._formBuilder.group({
      store_id: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._segmentAffiliatedKipon.state.form.controls;
  }
  onSubmit() {
    this._segmentAffiliatedKipon.state.isLoadingList = true;
    let item: SegmentAffiliatedKiponDTO = new SegmentAffiliatedKiponDTO();
    let formItems = this._segmentAffiliatedKipon.state.form.value;
    item = {
      store_id: formItems.store_id.id,
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._segmentAffiliatedKipon.state.segmentAffiliatedKiponDTO = item;

    this._segmentAffiliatedKiponApi
      .inventoryKardexProduct(
        this._segmentAffiliatedKipon.state.segmentAffiliatedKiponDTO
      )
      .subscribe({
        next: (data) => {
          this._segmentAffiliatedKipon.state.segmentAffiliatedKiponResponse =
            data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._segmentAffiliatedKipon.state.isLoadingList = false;
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
