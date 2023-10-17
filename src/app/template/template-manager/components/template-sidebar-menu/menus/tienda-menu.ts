export const tiendaMenu = [
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
    icon: 'pi pi-fw pi-truck',
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
            label: 'Cumplimiento de Conteo',

            routerLink: ['/layout/reports/inventories/cycle-count'],
          },
        ],
      },
      {
        label: 'Segmentos',

        items: [
          {
            label: 'Afiliados KIPON SHOE CLUB',

            routerLink: ['/layout/reports/segments/affiliated-kipon'],
          },
        ],
      },
    ],
  },
  {
    label: 'SALIR',
    icon: 'pi pi-sign-out',
    expanded: true,
    disabled: true,
    items: [
      {
        label: 'Salir',
        command: () => {
          goMap();
        },
      },
    ],
  },
];

function goMap() {
  window.location.href = 'https://dashboard.impuls.com.mx/';
}
