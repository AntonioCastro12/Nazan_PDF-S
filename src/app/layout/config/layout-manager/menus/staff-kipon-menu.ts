export const staffKiponMenu = [
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
    items: [
      {
        label: 'Segmentos',
        icon: 'pi pi-fw pi-minus',
        items: [
          {
            label: 'Afiliados KIPON SHOE CLUB',
            icon: 'pi pi-fw pi-minus',
            routerLink: ['/layout/reports/segments/affiliated-kipon'],
          },
        ]
      },
    ],
  },
];
