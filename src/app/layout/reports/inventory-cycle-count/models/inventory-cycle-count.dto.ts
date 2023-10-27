export class InventoryCycleCountDTO {
  rtl_loc_id: number = 0;
  ID_CONTEO: string = "";
  TIPO_CONTEO: string = "";
  MARCA: string = "";
  FECHA_INICIAL: string = "";
  FECHA_FINAL: string = "";
  count_status: string = "";
  CANT_ITEMS: number = 0;
}

export const inventoryCycleCountLabels = {
  rtl_loc_id: 'Id tienda',
  ID_CONTEO: 'Id conteo',
  TIPO_CONTEO: 'Tipo conteo',
  MARCA: 'Marca',
  FECHA_INICIAL: 'Fecha inicial',
  FECHA_FINAL: 'Fecha final',
  count_status: 'Estado del conteo',
  CANT_ITEMS: 'Cantidad items',
};
