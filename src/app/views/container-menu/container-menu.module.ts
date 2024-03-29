import { NgModule } from "@angular/core";

import { BaseSharedModule } from "src/app/resources/base-shared.module";
import { ContainerMenuRoutingModule } from "./container-menu.routing";
import { ContainerMenuComponent } from "./container-menu.component";
import { LoginModule } from "../login/login.module";


@NgModule({
  imports: [
    BaseSharedModule,
    ContainerMenuRoutingModule,
    LoginModule
  ],
  declarations: [
    ContainerMenuComponent
  ],
  providers: [
  ]
})

export class ContainerMenuModule {}
