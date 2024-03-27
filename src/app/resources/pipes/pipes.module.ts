import { NgModule } from '@angular/core';

import {NumberDecimalPipe} from "./number-decimal.pipe";
import {DateFormatPipe} from "./date-format.pipe";
import {YearMonthPipe} from "./year-month.pipe";
import {NpwpPipe} from "./npwp.pipe";

@NgModule({
  imports: [],
  exports: [
    NumberDecimalPipe,
    DateFormatPipe,
    YearMonthPipe,
    NpwpPipe
  ],
  declarations: [
    NumberDecimalPipe,
    DateFormatPipe,
    YearMonthPipe,
    NpwpPipe
  ],
  providers: []
})
export class PipesModule { }
