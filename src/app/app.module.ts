import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseSharedModule } from './resources/base-shared.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EmployeeModule } from './views/employee/employee.module';
import { UiBlockModule } from './resources/components/ui-block/ui-block.module';
import { FakeService } from './resources/services/fake.service';
import { SnackbarModule } from './resources/components/snackbar/snackbar.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiBlockModule,
    SnackbarModule, 
    BaseSharedModule,
    EmployeeModule
  ],
  providers: [
    FakeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
