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
    items: [
      {
        label: 'Inventarios',
        icon: 'pi pi-fw pi-minus',
        items: [
          {
            label: 'Kardex de articulo',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventory/kardex'],
          },
          {
            label: 'Existencia de inventario',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/inventory/stock-resume'],
          },
        ]
      },
    ],
  },

];
