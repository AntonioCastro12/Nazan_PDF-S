export const staffInventariosOSTMenu = [
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
    label: 'Administración y Finanzas',
    icon: 'pi pi-fw pi-money-bill',
    items: [
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
        ],
      },
    ],
  },
  {
    label: 'Salir',
    icon: 'pi pi-sign-out',
    command: () => {
      goMap();
    },
  },
];

function goMap() {
  window.location.href = 'https://dashboard.impuls.com.mx/';
}
