import { Routes } from '@angular/router';
import { SlidesFrontComponent } from 'src/app/layouts/Front/user-layout/slides-front/slides-front.component';
import { UserLayoutComponent } from './user-layout.component';
import { EventsfrontComponent } from './eventsfront/eventsfront.component';
import { AddreservationComponent } from './addreservation/addreservation.component';
import { EventDetailsComponent } from './event-details/event-details.component';

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
      },
      {
        path: 'eventsf',
        component: EventsfrontComponent
      },
      {
        path: 'reserve',
        component: AddreservationComponent
      },
      { path: 'event-details/:id', component: EventDetailsComponent },

      
    ]
  }
  
 
];
