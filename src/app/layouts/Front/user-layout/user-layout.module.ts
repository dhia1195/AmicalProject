import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserLayoutRoutes } from './user-layout.routing';
import { ListSlidesComponent } from 'src/app/pages/ui-components/list-slides/list-slides.component';
import { NavbarfComponent } from './navbarf/navbarf.component';
import { SlidesFrontComponent } from 'src/app/layouts/Front/user-layout/slides-front/slides-front.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UserLayoutComponent } from './user-layout.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthenticationModule } from 'src/app/pages/authentication/authentication.module';
import { EventsfrontComponent } from './eventsfront/eventsfront.component';
import { AddreservationComponent } from './addreservation/addreservation.component';
import { MatCardModule } from '@angular/material/card';
import { EventDetailsComponent } from './event-details/event-details.component';
import { MaterialModule } from 'src/app/material.module';
import { ConventionsfrontComponent } from './conventionsfront/conventionsfront.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MaterialModule,

    
  
  ],
  declarations: [
    NavbarfComponent,
    SlidesFrontComponent,
    UserLayoutComponent,
    EventsfrontComponent,
   
    AddreservationComponent,
    EventDetailsComponent,
    ConventionsfrontComponent,
    
  ]
})
export class UserLayoutModule {}
