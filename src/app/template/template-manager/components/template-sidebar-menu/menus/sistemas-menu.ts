export const sistemasMenu = [
  {
    label: ' BIENVENIDA',
    expanded: true,
    disabled: true,
    items: [
      {
        label: 'Inicio',
        routerLink: ['/layout/home'],
      },
    ],
  },
  {
    label: 'Operaciones',
    icon: 'pi pi-fw pi-truck',
    expanded: true,
    disabled: true,
    items: [
      {
        label: 'Inventarios',

        items: [
          {
            label: 'Kardex de artículo',

            routerLink: ['/layout/reports/inventories/kardex'],
          },
          {
            label: 'Cumplimiento de Conteo',

            routerLink: ['/layout/reports/inventories/cycle-count'],
          },
          {
            label: 'Diferencia de inventario SAP vs Xstore',

            routerLink: ['/layout/reports/inventories/sap-xstore'],
          },
        ],
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
        ],
      },
      {
        label: 'Ventas',

        items: [
          {
            label: 'Venta de Mayoreos',

            routerLink: ['/layout/reports/sales/wholesale-sales'],
          },
        ],
      },
    ],
  },
  {
    label: 'MARKETING',
    icon: 'pi pi-fw pi-megaphone',
    expanded: true,
    disabled: true,
    items: [
      {
        label: 'Club impuls Premia',

        items: [
          {
            label: 'General mov. puntos y monedero',

            routerLink: ['/layout/reports/point-program/total-movement'],
          },
          {
            label: 'Detalle mov. puntos y monedero',

            routerLink: ['/layout/reports/point-program/detail-points'],
          },
          {
            label: 'Detalle movimientos monedero',

            routerLink: ['/layout/reports/point-program/detail-wallet'],
          },
        ],
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
        ],
      },
    ],
  },
  {
    label: 'ADMINISTRACIÓN Y FINANZAS',
    icon: 'pi pi-fw pi-money-bill',
    expanded: true,
    disabled: true,
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
        ],
      },
    ],
  },
  {
    label: 'PLANEACIÓN Y COMPRAS',
    icon: 'pi pi-fw pi-list',
    expanded: true,
    disabled: true,
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
            routerLink: ['/layout/reports/inventories/inventory-stock/resume'],
          },
        ],
      },
    ],
  },
];
