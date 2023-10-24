export class KardexProductDTO {
  storeId: string = '';
  productId: string = '';
  origin: 'xcenter' | 'xstore' = 'xcenter';
  startDate: string = '';
  endDate: string = '';
}

export const kardexProductDTOname = {
  storeId: 'Tienda',
  productId: 'Producto',
  origin: 'Origen',
  startDate: 'Fecha de inicio',
  endDate: 'Fecha final',
};
