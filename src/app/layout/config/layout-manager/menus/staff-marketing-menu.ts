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
        icon: 'pi pi-fw pi-minus',
        items: [
          {
            label: 'Reporte de Totales de movimiento de puntos y monedero',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/point-program/total-movement'],
          },
          {
            label: 'Reporte de Detalle de moviminetos de puntos y premios',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/point-program/detail-points'],
          },
          {
            label: 'Reporte de Detalle de moviminetos de monedero',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/point-program/detail-wallet'],
          },
        ]
      },
    ],
  },
];
