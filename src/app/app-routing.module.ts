import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { FakeService } from './resources/services/fake.service';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: 'employee',
    // component: EmployeeComponent
    loadChildren: () =>
      import('src/app/views/employee/employee.module').then((m) => m.EmployeeModule),
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
