import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerMenuComponent } from './container-menu.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [

  {
    path: '',
    component: ContainerMenuComponent,
    children: [
      
      {
        path: 'login',
        loadChildren: () =>
          import('src/app/views/login/login.module').then((m) => m.LoginModule),
      },

      {
        path: 'employee',
        loadChildren: () =>
          import('src/app/views/employee/employee.module').then((m) => m.EmployeeModule),
      },

    ]
  },
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContainerMenuRoutingModule {}
