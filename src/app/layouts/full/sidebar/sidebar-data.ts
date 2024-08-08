import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'Slides',
    iconName: 'presentation',
    route: '/ListeSlides',
  },
  {
    displayName: 'Events',
    iconName: 'calendar',  // Use 'calendar' or another relevant icon name
    route: '/ListeEvents',
  },
  {
    displayName: 'Reservations',
    iconName: 'layout-navbar-expand',
    route: '/ListReservations',
  },
  
 
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  
];
