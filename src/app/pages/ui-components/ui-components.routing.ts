import { Routes } from '@angular/router';

// ui
import { AppMenuComponent } from './menu/menu.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      
   
      {
        path: 'menu',
        component: AppMenuComponent,
      },
     
        
    ],
  },
];
