export class InventoryPodDTO {
  T_ORIGEN: string = '';
  NOMBRE_TDA_ORIGEN: string = '0';
  T_DESTINO: number = 0;
  L_EMBARQUE: string = '';
  TIPO_EMBARQUE: string = '';
  FEC_CREA_SISTEMA: string = '';
  FEC_HORA_POD: string = '';
  FEC_HORA_CIERRE: string = '';
  TIEMPO_HRS: number = 0;
  ESTATUS: string = '';
}

export const inventoryPodLabels = {
  T_ORIGEN: 'Tienda origen',
  NOMBRE_TDA_ORIGEN: 'Nombre tienda origen',
  T_DESTINO: 'Tienda destino',
  L_EMBARQUE: 'Linea de embarque',
  TIPO_EMBARQUE: 'Tipo embarque',
  FEC_CREA_SISTEMA: 'Fecha creacion sistema',
  FEC_HORA_POD: 'Fecha/Hora recepcion',
  FEC_HORA_CIERRE: 'Fecha/Hora cierre',
  TIEMPO_HRS: 'Tiempo',
  ESTATUS: 'Estatus',
};
