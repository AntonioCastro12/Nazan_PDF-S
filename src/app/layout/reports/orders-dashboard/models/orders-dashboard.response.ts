export class OrdersDashboardResponse {
  tienda: any;
  porStatus: OrderByStatus = new OrderByStatus();
  porAntiguedad: OrderByAge = new OrderByAge();
  anteriores: OrderDashboardRecord[] = [];
  unMes: OrderDashboardRecord[] = [];
  ultimaSemana: OrderDashboardRecord[] = [];
}

class OrderByStatus {
  tienda: any;
  status: any;
  cantidad: any;
}

class OrderByAge {
  tienda: any;
  ultimaSemana: any;
  unMes: any;
  anteriores: any;
}

class OrderDashboardRecord {
  tienda: any;
  orden: any;
  fechaOrden: any;
  statusOrden: any;
  item: any;
  descripcion: any;
  cantidad: any;
  statusItem: any;
  diasEspera: any;
}
