export const warehouseMenu = [
  {
    label: 'Almacén',
    items: [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/layout/welcome/home'],
      },
    ],
  },
  {
    label: 'Pedidos',
    items: [
      {
        label: 'Almacén',
        icon: 'pi pi-fw pi-check-square',
        routerLink: ['/layout/order/warehouse'],
      },
      {
        label: 'Expiradas',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/order/timeout'],
      },
      {
        label: 'Reporte diario',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/order/daily-report'],
      },
    ],
  },

  {
    label: 'Reportes',
    items: [
      {
        label: 'Reporte histórico',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/report/report-order'],
      },
    ],
  },

  {
    label: 'Salir',
    items: [
      {
        label: 'Salir',
        icon: 'pi pi-fw pi-prime',
        routerLink: ['/layout/welcome/logout'],
      },
    ],
  },
];
