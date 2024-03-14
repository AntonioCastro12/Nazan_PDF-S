export const staffPlaneacionMenu = [
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
    label: 'Planeación y Compras',
    icon: 'pi pi-fw pi-list',
    items: [
      {
        label: 'Inventario',

        items: [
          {
            label: 'Reporte de recepción de mercancía (POD)',
            routerLink: ['inventory-pod'],
          },
          {
            label: 'Existencia de inventario',
            routerLink: ['inventory-stock-resume'],
          },
        ],
      },
    ],
  },
];

function goMap() {
  window.location.href = 'https://dashboard.impuls.com.mx/';
}
