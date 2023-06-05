export const mainMenu = [
  {
    label: 'Bienvenida',
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
        label: 'Resumen de pedidos',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/order'],
      },
      {
        label: 'Mostrador',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/layout/order/frontdesk'],
      },
      {
        label: 'Almacén',
        icon: 'pi pi-fw pi-check-square',
        routerLink: ['/layout/order/warehouse'],
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
        routerLink: ['/blocks'],
        badge: 'NEW',
      },
      {
        label: 'Documentation',
        icon: 'pi pi-fw pi-question',
        routerLink: ['/documentation'],
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
