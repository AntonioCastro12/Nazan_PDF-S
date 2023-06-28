export const tiendaMenu = [
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
    label: 'Operaciones',
    items: [
      {
        label: 'Inventarios',
        icon: 'pi pi-fw pi-minus',
        items: [
          {
            label: 'Kardex de artículo',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventory/kardex'],
          },
          {
            label: 'Existencia de inventario',
            icon: 'pi pi›-fw pi-minus',
            routerLink: ['/layout/reports/inventory/stock-resume'],
          },
          {
            label: 'Cumplimiento de conteos ciclicos',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventory/cycle-count'],
          },
        ]
      },
    ]
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
