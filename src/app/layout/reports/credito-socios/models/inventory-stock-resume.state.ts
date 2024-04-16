import { UntypedFormGroup } from '@angular/forms';
import { InventoryStockResumeDTO } from './inventory-stock-resume.dto';
import {
  InventoryStockDetailResponse,
  InventoryStockResumeResponse,
} from './inventory-stock-resume.response';

export class InventoryStockResumeState {
  inventoryStockResumeDTO: InventoryStockResumeDTO =
    new InventoryStockResumeDTO();
  inventoryStockResumeResponse: InventoryStockResumeResponse[] = [];
  inventoryStockResumeResponseList: InventoryStockResumeResponse[] = [];
  inventoryStockDetailResponse: InventoryStockDetailResponse[] = [];
  inventoryStockDetailResponseList: InventoryStockDetailResponse[] = [];

  currentStore!: string;
  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  isVisibleModal: boolean = false;
}
