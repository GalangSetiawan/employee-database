import { NgModule } from "@angular/core";

import { BaseSharedModule } from "src/app/resources/base-shared.module";
import { LoginRoutingModule } from "./login.routing";
import { LoginComponent } from "./login.component";


@NgModule({
  imports: [
    BaseSharedModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  exports:[
    LoginComponent
  ],
  providers: [
  ]
})

export class LoginModule {}
