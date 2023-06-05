export const adminMenu = [
  {
    label: 'Administrador',
    items: [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/layout/welcome/home'],
      },
    ],
  },
  {
    label: 'Pedidos',
    items: [

      {
        label: 'Almacén',
        icon: 'pi pi-fw pi-check-square',
        routerLink: ['/layout/order/warehouse'],
      },
      {
        label: 'Mostrador',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/order/frontdesk'],
      },
      {
        label: 'Expiradas',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/order/timeout'],
      },
      {
        label: 'Reporte diario',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/order/daily-report'],
      },
    ],
  },
  {
    label: 'Reportes',
    items: [
      {
        label: 'Reporte histórico',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/report/report-order'],
      },
    ],
  },
  {
    label: 'Configuración',
    items: [
      {
        label: 'Tiendas',
        icon: 'pi pi-fw pi-eye',
        routerLink: ['/layout/store'],
        badge: 'NEW',
      },
      {
        label: 'Impresora',
        icon: 'pi pi-fw pi-eye',
        routerLink: ['/layout/printer'],
        badge: 'NEW',
      },
      // {
      //   label: 'Documentation',
      //   icon: 'pi pi-fw pi-question',
      //   routerLink: ['/documentation'],
      // },
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
