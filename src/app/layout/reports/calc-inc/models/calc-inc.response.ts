

export class catActuales{
  Catalogo: string| null | undefined = null;
  Id: string | null | undefined = null;
}

export class descPred{
  descuento: string | null | undefined= null;
  idDescuento: string | null| undefined = null;
}

export class taGralResponse{
  business_date: string | null | undefined = null;
  item_desc: string | null = null;
  item_id: string | null = null;
  quantity: number = 0;
  rtl_loc_id: number = 0;
total: string | null = null;
}

export const headerPersonalizadoGral: any [] = [
  'ID',
  'TITLE',
  'Descripción',
  'PRICE',
  '10+42',
  'Total' //ELIMINAR

]
