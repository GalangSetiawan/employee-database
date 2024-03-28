import { NgModule } from "@angular/core";

import { BaseSharedModule } from "src/app/resources/base-shared.module";
import { EmployeeRoutingModule } from "./employee.routing";
import { EmployeeComponent } from "./employee.component";
import { EmployeeInputComponent } from "./input/employee-input.component";
import { EmployeeDetailComponent } from "./detail/employee-detail.component";


@NgModule({
  imports: [
    BaseSharedModule,
    EmployeeRoutingModule
  ],
  declarations: [
    EmployeeComponent,
    EmployeeInputComponent,
    EmployeeDetailComponent
  ],
  providers: [
  ]
})

export class EmployeeModule {}
