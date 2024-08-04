import { Routes } from '@angular/router';
import { SlidesFrontComponent } from 'src/app/layouts/Front/user-layout/slides-front/slides-front.component';
import { UserLayoutComponent } from './user-layout.component';

export const UserLayoutRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'slidesf',
        component: SlidesFrontComponent
      },
      {
        path: '',
        redirectTo: 'slidesf',
        pathMatch: 'full'
      }
    ]
  }
  
 
];
