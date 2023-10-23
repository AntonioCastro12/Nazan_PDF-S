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

            routerLink: ['/layout/reports/sales/invoice-total'],
          },
          {
            label: 'Informe general de ventas',

            routerLink: ['/layout/reports/sales/general-sales'],
          },
        ],
      },
      // {
      //   label: 'Inventarios',
      //   items: [
      //     {
      //       label: 'Existencia de inventario',
      //       routerLink: ['/layout/reports/inventories/inventory-stock/resume'],
      //     },
      //   ]
      // },
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
