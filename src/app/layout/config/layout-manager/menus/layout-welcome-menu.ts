export const welcomeMenu = [
  {
    label: 'Bienvenida',
    items: [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/layout/ticket/list'],
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
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventory/stock-resume'],
          },
          {
            label: 'Comparación de inventario',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventory/comparison'],
          },
          {
            label: 'Cumplimiento de conteos ciclicos',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/logs/list'],
          },
          {
            label: 'Diferencia de inventario SAP vs Xstore',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventory/sap-xstore'],
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
          {
            label: 'Afiliados KIPON SHOE CLUB',
            icon: 'pi pi-fw pi-minus',
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
  {
    label: 'Administración y Finanzas',
    items: [
      {
        label: 'Ventas',
        icon: 'pi pi-fw pi-minus',
        items: [
          {
            label: 'Totales de facturación',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/sales/invoice-total'],
          },
          {
            label: 'Informe general de ventas',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/sales/general-sales'],
          },
        ]
      },
      {
        label: 'Inventarios',
        icon: 'pi pi-fw pi-minus',
        items: [
          {
            label: 'Kardex de articulo',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventory/kardex'],
          },
          {
            label: 'Existencia de inventario',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventory/stock-resume'],
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
        icon: 'pi pi-fw pi-minus',
        items: [
          {
            label: 'Reporte de recepción de mercancía (POD)',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventory/pod'],
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
