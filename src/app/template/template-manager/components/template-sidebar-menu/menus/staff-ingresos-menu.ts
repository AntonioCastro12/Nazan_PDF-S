export const staffIngresosMenu = [
  {
    label: 'Bienvenida',
    expanded: true,
    disabled: true,
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
    expanded: true,
    items: [
      {
        label: 'Ventas',

        items: [
          {
            label: 'Totales de facturación',

            routerLink: ['sales-invoice-total'],
          },
          {
            label: 'Informe general de ventas',

            routerLink: ['sales-general-sales'],
          },
        ],
      },
    ],
  },
];

function goMap() {
  window.location.href = 'https://dashboard.impuls.com.mx/';
}
