export const staffIngresosMenu = [
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
    label: 'Administración y Finanzas',
    items: [
      {
        label: 'Ventas',
        icon: 'pi pi-fw pi-minus',
        items: [
          {
            label: 'Informe general de ventas',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/sales/general-sales'],
          },
          {
            label: 'Venta de Mayoreos',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/sales/wholesale-sales'],
          },
        ]
      },

    ],
  },
];
