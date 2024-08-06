import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { MatNativeDateModule } from '@angular/material/core';
import { SlidesFrontComponent } from '../../layouts/Front/user-layout/slides-front/slides-front.component';
import { AddEventsComponent } from './add-events/add-events.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { UpdateEventsComponent } from './update-events/update-events.component';
import { UpdateSlidesComponent } from './update-slides/update-slides.component';
import { DeletedSlidesComponent } from './deleted-slides/deleted-slides.component';
import { DeletedEventsComponent } from './deleted-events/deleted-events.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
  ],
  declarations: [
    AppBadgeComponent,
    AppChipsComponent,
    AppListsComponent,
    AppMenuComponent,
    AppTooltipsComponent,

   
    
    
  ],
})
export class UicomponentsModule {}
