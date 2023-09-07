export const staffMayoreoMenu = [
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
            routerLink: ['/layout/reports/inventories/kardex'],
          },
          {
            label: 'Existencia de inventario',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventories/inventory-stock/resume'],
          },
          {
            label: 'Cumplimiento de conteos ciclicos',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventories/cycle-count'],
          },
        ]
      },
      {
        label: 'Segmentos',
        icon: 'pi pi-fw pi-minus',
        items: [
          {
            label: 'Segmento colaboradores Nazan',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/segments/collaborators-nazan'],
          },
        ]
      },
    ],
  },
];
