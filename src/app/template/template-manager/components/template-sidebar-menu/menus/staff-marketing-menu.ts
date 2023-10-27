export const staffMarketingMenu = [
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
    label: 'Marketing',
    icon: 'pi pi-fw pi-megaphone',
    items: [
      {
        label: 'Club impuls Premia',

        items: [
          {
            label: 'General mov. puntos y monedero',

            routerLink: ['point-program-total-movement'],
          },
          {
            label: 'Detalle mov. puntos y monedero',

            routerLink: ['point-program-detail'],
          },
          {
            label: 'Detalle movimientos monedero',

            routerLink: ['point-program-detail-wallet'],
          },
        ],
      },
    ],
  },
];

function goMap() {
  window.location.href = 'https://dashboard.impuls.com.mx/';
}
