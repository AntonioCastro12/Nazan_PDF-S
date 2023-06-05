import { Injectable } from '@angular/core';

import { RoleEntity } from '@shared/models/role.entity';
import { StoreEntity } from '@shared/models/store.entity';

import { LayoutStateService } from 'src/app/layout/config/layout-manager/services';

import { LayoutState } from '../models/layout.state';

@Injectable({
  providedIn: 'root',
})
export class LayoutStorageService {
  constructor(private layoutStateService: LayoutStateService) {}

  setLayoutState(
    layoutState: LayoutState,
    storeSelected: StoreEntity,
    roleSelected: RoleEntity
  ) {
    // layoutState.id = `${storeSelected.store_id}-${roleSelected.value}`;
    // layoutState.store_id = `${storeSelected.store_id}`;
    // layoutState.role_value = `${roleSelected.value}`;

    layoutState ? (layoutState = new LayoutState()) : layoutState;

    localStorage.setItem('layoutState', JSON.stringify(layoutState));
    this.layoutStateService.layoutState = layoutState;
  }

  getLayoutState(): LayoutState {
    // let layoutState = new LayoutState();
    let layoutState = JSON.parse(localStorage.getItem('layoutState') as string);

    this.layoutStateService.layoutState;
    localStorage.setItem('layoutState', JSON.stringify(layoutState));

    return layoutState;
  }
}
