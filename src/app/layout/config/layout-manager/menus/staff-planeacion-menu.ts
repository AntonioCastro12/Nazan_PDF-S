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
        icon: 'pi pi-fw pi-minus',
        items: [
          {
            label: 'Reporte de recepción de mercancía (POD)',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventories/pod'],
          },
        ]
      },
    ],
  },
];
