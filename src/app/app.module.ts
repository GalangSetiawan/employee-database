import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseSharedModule } from './resources/base-shared.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { InputComponent } from './employee/input/input.component';
import { EmployeeModule } from './views/employee/employee.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    BaseSharedModule,
    EmployeeModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
