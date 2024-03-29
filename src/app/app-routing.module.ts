import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { FakeService } from './resources/services/fake.service';
import { AppComponent } from './app.component';
import { ContainerMenuComponent } from './views/container-menu/container-menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },


  {
    path: '',
    component: AppComponent,
    children: [
      
      {
        path: '',
        loadChildren: () => import('src/app/views/container-menu/container-menu.module').then(m => m.ContainerMenuModule),
      },

    ]
  },

  

  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
  providers: [
    FakeService
  ]
})
export class AppRoutingModule { }
