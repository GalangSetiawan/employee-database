import { NgModule } from "@angular/core";

import { BaseSharedModule } from "src/app/resources/base-shared.module";
import { LoginComponent } from "./login.component";
import { FakeService } from "src/app/resources/services/fake.service";


@NgModule({
  imports: [
    BaseSharedModule,
    
  ],
  declarations: [
    // LoginComponent,
  ],
  providers: [
    FakeService
  ]
})

export class LoginModule {}
