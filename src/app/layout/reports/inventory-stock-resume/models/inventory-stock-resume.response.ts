export class InventoryStockResumeResponse {
  store_id: number = 0;
  line: string | null = null;
  qty: number | null = null;
}

export const inventoryStockResumeResponseName = {
  store_id: 'Tienda',
  line: 'Linea',
  qty: 'Cantidad',
};
