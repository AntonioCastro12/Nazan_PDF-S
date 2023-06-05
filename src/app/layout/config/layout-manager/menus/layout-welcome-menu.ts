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
    label: 'Procesos OnDemand',
    items: [
      {
        label: 'Proccess Orders',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/ondemand/processOrders'],
      },
      {
        label: 'Close Orders',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/ondemand/closeOrders'],
      },
    ],
  },
  {
    label: 'Reportes',
    items: [
      {
        label: 'Órdenes',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/reports/orders/list'],
      },
      {
        label: 'Logs',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/reports/logs/list'],
      },
    ],
  },

  /* {
    label: 'Configuración',
    items: [
      {
        label: 'Prueba del sistema',
        icon: 'pi pi-fw pi-eye',
        routerLink: ['/layout/printer'],
        badge: 'NEW',
      },
    ],
  },
 */
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
