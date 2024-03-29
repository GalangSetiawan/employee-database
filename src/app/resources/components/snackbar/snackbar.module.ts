import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './snackbar.component';
import { SnackBarService } from './snackbar.service';


@NgModule({
  imports: [
    CommonModule,

  ],
  exports: [SnackBarComponent],
  declarations: [SnackBarComponent],
  providers: [SnackBarService]
})
export class SnackbarModule { }
