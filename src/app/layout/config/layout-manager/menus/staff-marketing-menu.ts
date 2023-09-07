export const staffMarketingMenu = [
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
    label: 'Marketing',
    items: [
      {
        label: 'Programa de puntos',

        items: [
          {
            label: 'Reporte de Totales de movimiento de puntos y monedero',

            routerLink: ['/layout/reports/point-program/total-movement'],
          },
          {
            label: 'Reporte de Detalle de moviminetos de puntos y premios',

            routerLink: ['/layout/reports/point-program/detail-points'],
          },
          {
            label: 'Reporte de Detalle de moviminetos de monedero',

            routerLink: ['/layout/reports/point-program/detail-wallet'],
          },
        ]
      },
    ],
  },
];
