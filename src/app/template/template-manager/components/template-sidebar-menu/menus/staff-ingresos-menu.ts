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
          {
            label: 'Venta de Mayoreos',

            routerLink: ['/layout/reports/sales/wholesale-sales'],
          },
        ],
      },
      // {
      //   label: 'Inventarios',
      //   items: [
      //     {
      //       label: 'Existencia de inventario',
      //       icon: 'pi pi›-fw pi-minus',
      //       routerLink: ['/layout/reports/inventories/inventory-stock/resume'],
      //     },
      //   ]
      // },
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
