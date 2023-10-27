export class SalesInvoiceTotalDTO {
  storeId: string = '';
  businessDate: string = '';
  saleTypeSale: string = '';
  totalMoneySale: number = 0;
  totalUnitSale: number = 0;
  countInvoiceSale: number = 0;
  saleTypeReturn: string = '';
  totalMoneyReturn: number = 0;
  totalUnitReturn: number = 0;
  countInvoiceReturn: number = 0;
  saleTypeFreight: string = '';
  totalMoneyFreight: number = 0;
  totalUnitFreight: number = 0;
  countInvoiceFreight: number = 0;
  unitPercentReturn: number = 0;
  totalPercentReturn: number = 0;
}

export const salesInvoiceTotalLabels = {
  storeId: 'Tienda',
  businessDate: 'Fecha',
  countInvoiceSale: 'Cantidad facturas',
  totalUnitSale: 'Ventas unidades',
  totalUnitReturn: 'Devoluciones unidades',
  unitPercentReturn: '% Devoluciones unidades',
  totalUnitFreight: 'Cantidad fletes',
  totalMoneySale: '$ Ventas',
  totalMoneyFreight: '$ Flete',
  totalMoneyReturn: '$ Devoluciones',
  totalPercentReturn: '% Devoluciones $',
  avgSales: 'Promedio ventas $',
};
