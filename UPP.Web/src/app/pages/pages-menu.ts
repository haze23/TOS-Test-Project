import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
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
        title: 'View All',
        link: '/pages/facilitation/employees-list-view',
      }, 
      {
        title: 'Add New',
        link: '/pages/facilitation/employee-create',
      },    
    ],
  },
  {
    title: 'Operations',
    icon: 'briefcase-outline',
    children: [
      {
        title: 'Bookings',
        link: '/pages/operations/bookings',
      },     
    ],
  },
  {
    title: 'Settings',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Locations',
        link: '/pages/lookup/areas',
      },
      {
        title: 'Equity',
        link: '/pages/lookup/equity',
      },
      {
        title: 'Gender',
        link: '/pages/lookup/gender',
      }, 
      {
        title: 'Employment Department',
        link: '/pages/lookup/employee-depts',
      },  
      {
        title: 'Provinces',
        link: '/pages/lookup/provinces',
      },  
      {
        title: 'Payment Types',
        link: '/pages/lookup/payment-types',
      },  
    ],
  },
];
