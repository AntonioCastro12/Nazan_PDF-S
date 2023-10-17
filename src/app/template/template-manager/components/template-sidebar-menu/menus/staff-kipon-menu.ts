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
    icon: 'pi pi-fw pi-truck',
    items: [
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
