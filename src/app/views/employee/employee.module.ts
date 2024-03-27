import { NgModule } from "@angular/core";

import { BaseSharedModule } from "src/app/resources/base-shared.module";
import { EmployeeRoutingModule } from "./employee.routing";
import { EmployeeComponent } from "./employee.component";
import { EmployeeInputComponent } from "./input/employee-input.component";


@NgModule({
  imports: [
    BaseSharedModule,
    EmployeeRoutingModule
  ],
  declarations: [
    EmployeeComponent,
    EmployeeInputComponent
  ],
  providers: [
  ]
})

export class EmployeeModule {}
