import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { HomePage } from './features/home-page/home-page';
import { EditPage } from './features/edit-page/edit-page';
import { CreatePage } from './features/create-page/create-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path:'edit/:id',
        component:EditPage
      },
      {
        path:'create',
        component: CreatePage
      }
    ],
  },
];
