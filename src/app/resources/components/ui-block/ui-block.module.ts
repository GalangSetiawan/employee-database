import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiBlockComponent } from './ui-block.component';
import { UiBlockService } from './ui-block.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  exports: [
    UiBlockComponent
  ],
  declarations: [
    UiBlockComponent
  ],
  providers: [
    UiBlockService
  ],
})
export class UiBlockModule { }
