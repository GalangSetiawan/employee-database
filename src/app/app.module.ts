import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { EmployeeComponent } from './views/employee/employee.component';
import { BaseSharedModule } from './resources/base-shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseSharedModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
