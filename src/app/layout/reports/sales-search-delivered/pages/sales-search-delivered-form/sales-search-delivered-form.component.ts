import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  SalesSearchDeliveredDTO,
  SalesSearchDeliveredLabels,
} from '../../models';
import {
  SalesSearchDeliveredApiService,
  SalesSearchDeliveredStateService,
} from '../../services';
import { SalesSearchDeliveredActionService } from '../../services/sales-search-delivered-action.service';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'sales-search-delivered-form',
  templateUrl: './sales-search-delivered-form.component.html',
  styleUrls: ['./sales-search-delivered-form.component.scss'],
})
export class SalesSearchDeliveredFormComponent {
  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Restaurar filtros',
    labelSave: 'Buscar',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    cardNumber: 'Número de afiliado',
    title: 'Búsqueda por',
    placeholderProductId: 'Código de producto',
    placeholderOrigin: 'Seleccionar origen',
  };

  SalesSearchDeliveredLabels = SalesSearchDeliveredLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _SalesSearchDelivered: SalesSearchDeliveredStateService,
    public _SalesSearchDeliveredAction: SalesSearchDeliveredActionService,
    private route: ActivatedRoute,
    public _common: CommonStateService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
    this.userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
  }

  ngOnInit(): void {
    this.onFillForm();

    if (
      this.route.snapshot.queryParamMap.get('favorite') ||
      this.route.snapshot.queryParamMap.get('historic')
    ) {
      this.onManageFav();
    }
  }

  onFillForm() {
    this._SalesSearchDelivered.state.form = this._formBuilder.group({
      cardNumber: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._SalesSearchDelivered.state.form.controls;
  }

  onSubmit() {
    this._SalesSearchDelivered.state.isLoadingList = true;
    let item: SalesSearchDeliveredDTO = new SalesSearchDeliveredDTO();
    let formItems = this._SalesSearchDelivered.state.form.value;
    item = {
      cardNumber: formItems.cardNumber,
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._SalesSearchDelivered.state.SalesSearchDeliveredDTO = item;

    this._SalesSearchDeliveredAction.onGetList(item);
  }

  onReset() {
    this.onFillForm();
  }

  onFilterStores(event: { query: string }) {
    const filteredStores: Store[] = [];
    const stores: Store[] = [];
    const userRol = this.userSelected.privileges.reportesadministrativos;
    const userStore = this.userSelected.tienda;

    if (userRol.includes('sistemas') || userRol.includes('staff-ingresos')) {
      stores.push(...this.storeList);
    }

    for (const store of stores) {
      if (store.name.toLowerCase().includes(event.query.toLowerCase())) {
        filteredStores.push(store);
      }
    }
    this.suggestions = filteredStores;
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/sales/general-sales'
        )
      : this._common.state.historic.find(
          (item) =>
            item.index ===
            Number(this.route.snapshot.queryParamMap.get('index'))
        );

    if (report) {
      const selectedStore = this.storeList.find(
        (item) => item.id === report.searchCriteria.storeId
      );

      this._SalesSearchDelivered.state.form = this._formBuilder.group({
        storeId: selectedStore,
        businessDate: report.searchCriteria.businessDate,
      });

      this.onSubmit();
    }
  }
}
