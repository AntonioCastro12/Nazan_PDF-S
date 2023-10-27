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

            routerLink: ['inventory-kardex'],
          },
          {
            label: 'Existencia de inventario',
            routerLink: ['inventory-stock-resume'],
          },
          {
            label: 'Diferencia de inventario SAP vs Xstore',

            routerLink: ['inventory-sap-xstore'],
          },
        ],
      },
    ],
  },
];

function goMap() {
  window.location.href = 'https://dashboard.impuls.com.mx/';
}
