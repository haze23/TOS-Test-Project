import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Employees',
    icon: 'person-outline',
    children: [
      {
        title: 'View All',
        link: '/pages/employee/employees',
      },    
    ],
    home: true,

  },
];
