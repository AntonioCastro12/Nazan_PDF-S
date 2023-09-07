export const welcomeMenu = [
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
            label: 'Existencia de inventario',

            routerLink: ['/layout/reports/inventories/inventory-stock/resume'],
          },
          {
            label: 'Comparación de inventario',

            routerLink: ['/layout/reports/inventories/comparison'],
          },
          {
            label: 'Cumplimiento de conteos ciclicos',

            routerLink: ['/layout/reports/inventories/cycle-count'],
          },
          {
            label: 'Diferencia de inventario SAP vs Xstore',

            routerLink: ['/layout/reports/inventories/sap-xstore'],
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
          {
            label: 'Afiliados KIPON SHOE CLUB',

            routerLink: ['/layout/reports/segments/affiliated-kipon'],
          },
        ]
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
  {
    label: 'Administración y Finanzas',
    items: [
      {
        label: 'Ventas',

        items: [
          {
            label: 'Totales de facturación',

            routerLink: ['/layout/reports/sales/invoice-total'],
          },
          {
            label: 'Informe general de ventas',

            routerLink: ['/layout/reports/sales/general-sales'],
          },
        ]
      },
      {
        label: 'Inventarios',

        items: [
          {
            label: 'Kardex de articulo',

            routerLink: ['/layout/reports/inventories/kardex'],
          },
          {
            label: 'Existencia de inventario',

            routerLink: ['/layout/reports/inventories/inventory-stock/resume'],
          },
        ]
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
        ]
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
