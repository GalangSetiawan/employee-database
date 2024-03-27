import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { TimeHelper } from '../helper/time-helper';

const DATE_FORMAT = {
  'shortDate': 'dd/MM/yyyy',
  'shortDate2': 'dd-MM-yyyy',
  'mediumDate': 'dd MMM yyyy',
  'fullDate': 'dd MMMM yyyy',
  'shortDatetime': 'dd/MM/yyyy HH:mm',
  'shortDatetimeSecond': 'dd/MM/yyyy HH:mm:ss',
  'mediumDateTime': 'dd MMM yyyy HH:mm',
  'mediumDatetimeSecond': 'dd MMM yyyy HH:mm:ss',
  'jexcelFullDate': 'yyyy-MM-dd',
  'time': 'HH:mm',
  'timeWithSecond': 'HH:mm:ss',
  'timeWithoutColon': 'HHmm',
  'dayOfWeek': 'EEEE',
  'monthYear': 'MMMM yyyy'
};

type DateFormatType =
  'shortDate' | 'shortDate2' | 'mediumDate' | 'fullDate' |
  'shortDatetime' | 'shortDatetimeSecond' | 'mediumDateTime' | 'mediumDatetimeSecond' |
  'jexcelFullDate' | 'time' | 'timeWithSecond' | 'timeWithoutColon' | 'dayOfWeek' | 'monthYear';

@Pipe({ name: 'dateFormat', pure: true })
export class DateFormatPipe implements PipeTransform {

  private datePipe: DatePipe;
  constructor() {
    this.datePipe = new DatePipe('en-US');
  }

  public transform(value: Date | string | undefined | null, format: DateFormatType): string | null {
    try {
      if (value === null) {
        return null;
      }

      if (format === null) {
        format = 'shortDate';
      }

      let dateFormat = DATE_FORMAT[format];

      if (!DATE_FORMAT[format]) {
        dateFormat = format;
      }

      if (value instanceof Date) {
        if (value.getTime() === TimeHelper.getMaxDate().getTime()) {
          return '';
        }
        return this.datePipe.transform(value, dateFormat);
      }

      else {
        const date = new Date(value!);
        // const date = new Date(Number(value.substring(0, 4)), Number(value.substring(5, 7)), Number(value.substring(8, 10)));
        if (date.getTime() === TimeHelper.getMaxDate().getTime()) {
          return '';
        }
        return this.datePipe.transform(date, dateFormat, '+0700');
      }
    } catch (e) {
      console.error('[Dev Error] Unexpected error when using pipe', e);
      return 'undefined';
    }
  }

}
