import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { EmployeeComponent } from './views/employee/employee.component';
import { FakeService } from './resources/fake.service';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'employee', component: EmployeeComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    FakeService
  ]
})
export class AppRoutingModule { }
