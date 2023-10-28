export class KardexProductDTO {
  storeId: string = '';
  productId: string = '';
  origin: 'xcenter' | 'xstore' = 'xcenter';
  startDate: string = '';
  endDate: string = '';
}

export const kardexProductDTOname = {
  storeId: 'Tienda',
  productId: 'Código de producto',
  origin: 'Tipo de conteo',
  startDate: 'Desde',
  endDate: 'Hasta',
};
