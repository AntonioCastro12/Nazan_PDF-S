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
        ]
      },
      {
        label: 'Segmentos',
        icon: 'pi pi-fw pi-minus',
        items: [
          {
            label: 'Segmento colaboradores Nazan',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/orders/list'],
          },
          {
            label: 'Afiliados KIPON SHOE CLUB',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/logs/list'],
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
            label: 'Reporte deralledo puntos y premios',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/orders/list'],
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
            label: 'Informe general de ventas',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/orders/list'],
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
            routerLink: ['/layout/reports/orders/list'],
          },
          {
            label: 'Existencia de inventario',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/orders/list'],
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
            routerLink: ['/layout/reports/orders/list'],
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
