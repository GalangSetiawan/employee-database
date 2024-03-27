import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { TimeHelper } from '../helper/time-helper';

type DateFormatType =
  'shortDate' | 'shortDate2' | 'mediumDate' | 'fullDate' |
  'shortDatetime' | 'shortDatetimeSecond' | 'mediumDateTime' | 'mediumDatetimeSecond' |
  'jexcelFullDate' | 'time' | 'timeWithSecond' | 'timeWithoutColon' | 'dayOfWeek' | 'monthYear';

@Pipe({ name: 'yearMonth', pure: true })
export class YearMonthPipe implements PipeTransform {

  private datePipe: DatePipe;
  constructor() {
    this.datePipe = new DatePipe('en-US');
  }

  public transform(value: Date | string | undefined | null): string | null {
    try {
      if (value === null) {
        return null;
      }

      return this.datePipe.transform(value, 'MMM YYYY');
    } catch (e) {
      console.error('[Dev Error] Unexpected error when using pipe', e);
      return 'undefined';
    }
  }

}
