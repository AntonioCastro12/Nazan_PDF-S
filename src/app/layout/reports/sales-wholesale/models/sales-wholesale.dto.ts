export class SalesWholesaleDTO {
  Tienda: number = 0;
  Fecha: string = '';
  Num_Colaborador: string = '';
  Colaborador: string = '';
  Transacciones_Totales: number = 0;
  Total_Pares: number = 0;
  Transacciones_1_Par: number = 0;
  Transacciones_2_Par: number = 0;
  Transacciones_3_o_Mas_Par: number = 0;
  Mayoreos: number = 0;
}

export const salesWholesaleLabels = {
  Tienda: 'Tienda',
  Fecha: 'Fecha',
  Num_Colaborador: 'Num Colaborador',
  Colaborador: 'Colaborador',
  Transacciones_Totales: 'Transacciones totales',
  Total_Pares: 'Total pares',
  Transacciones_1_Par: 'Transacciones 1 par',
  Transacciones_2_Par: 'Transacciones 2 par',
  Transacciones_3_o_Mas_Par: 'Transacciones 3 o mas par',
  Mayoreos: 'Mayoreos',
};
