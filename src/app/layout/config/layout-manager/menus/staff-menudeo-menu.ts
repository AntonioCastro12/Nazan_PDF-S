export const staffMenudeoMenu = [
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

        items: [
          {
            label: 'Kardex de artículo',

            routerLink: ['/layout/reports/inventories/kardex'],
          },
          {
            label: 'Cumplimiento de conteos ciclicos',

            routerLink: ['/layout/reports/inventories/cycle-count'],
          },
        ]
      },
      {
        label: 'Segmentos',

        items: [
          {
            label: 'Colaboradores Nazan',

            routerLink: ['/layout/reports/segments/collaborators-nazan'],
          },
        ]
      },
    ],
  },
];
