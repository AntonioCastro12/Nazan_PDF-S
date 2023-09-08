export const staffPlaneacionMenu = [
  {
    label: 'Bienvenida',
    items: [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/layout/home'],
      },
    ],
  },
  {
    label: 'Planeación y Compras',
    items: [
      {
        label: 'Inventario',

        items: [
          {
            label: 'Reporte de recepción de mercancía (POD)',
            routerLink: ['/layout/reports/inventories/pod'],
          },
          {
            label: 'Existencia de inventario',
            icon: 'pi pi›-fw pi-minus',
            routerLink: ['/layout/reports/inventories/inventory-stock/resume'],
          },
        ]
      },
    ],
  },
];
