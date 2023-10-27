export class InventorySapXstoreDTO {
  store_id: number = 0;
  material: string = '';
  year: number = 0;
  sap: number = 0;
  xstore: number = 0;
  difference: number = 0;
  abs: number = 0;
}

export const inventorySapXstoreLabels = {
  store_id: 'Tienda',
  material: 'Material',
  year: 'Año',
  sap: 'Sap',
  xstore: 'Xstore',
  difference: 'Diferencia',
  abs: 'ABS',
};
