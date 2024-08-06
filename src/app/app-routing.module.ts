import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AddSlidesComponent } from './pages/ui-components/add-slides/add-slides.component';
import { ListSlidesComponent } from './pages/ui-components/list-slides/list-slides.component';
import { AddEventsComponent } from './pages/ui-components/add-events/add-events.component';
import { ListEventsComponent } from './pages/ui-components/list-events/list-events.component';
import { UpdateEventsComponent } from './pages/ui-components/update-events/update-events.component';
import { UpdateSlidesComponent } from './pages/ui-components/update-slides/update-slides.component';
import { DeletedSlidesComponent } from './pages/ui-components/deleted-slides/deleted-slides.component';
import { DeletedEventsComponent } from './pages/ui-components/deleted-events/deleted-events.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'front/slidesf',
    pathMatch: 'full',
  },
  
  {
    path: 'front',
    loadChildren: () =>
      import('./layouts/Front/user-layout/user-layout.module').then((m) => m.UserLayoutModule),
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'AddSlides',
        component: AddSlidesComponent
      },
      {
        path: 'ListeSlides',
        component: ListSlidesComponent
      },
      {
        path: 'AddEvents',
        component: AddEventsComponent
      },
      {
        path: 'ListeEvents',
        component: ListEventsComponent
      },
      {
        path: 'updateEvents/:id',
        component: UpdateEventsComponent
      },
      {
        path: 'updateSlides/:id',
        component: UpdateSlidesComponent
      },
      {
        path: 'deletedSlides',
        component: DeletedSlidesComponent
      },
      {
        path: 'deletedEvents',
        component: DeletedEventsComponent

      },

    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
