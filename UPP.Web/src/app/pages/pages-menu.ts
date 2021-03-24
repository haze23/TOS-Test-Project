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
        link: '/pages/facilitation/employees',
      },  
      {
        title: 'Add New',
        link: '/pages/facilitation/employee-edit',
      },     
    ],
    home: true,
  },
  {
    title: 'Settings',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Equity',
        link: '/pages/lookup/equity',
      },
      {
        title: 'Gender',
        link: '/pages/lookup/gender',
      },   
    ],
    home: true,

  },
];
