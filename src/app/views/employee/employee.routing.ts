import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeInputComponent } from './input/employee-input.component';
import { EmployeeDetailComponent } from './detail/employee-detail.component';

const routes: Routes = [
    {
        path: '', component: EmployeeComponent,
    },
    {
        path: 'input', component: EmployeeInputComponent,
    },
    {
        path: 'edit', component: EmployeeInputComponent,
    },
    {
        path: 'view', component: EmployeeDetailComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
