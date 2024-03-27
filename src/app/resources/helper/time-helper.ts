import { ObjectHelper } from './object-helper';

import * as moment from 'moment';

export class TimeHelper {
  public static getSystemDate() {
    return new Date();
  }

  public static getMaxDate() {
    return new Date(9999, 11, 31);
  }

  public static getLastDateOfMonth(year: number, month: number) {
    /* for month: 1 - 12, 1 means january, 12 means december */
    if (month === null || year === null) {
      return null;
    }
    return new Date(year, month, 0);
  }

  public static fromDate(date: Date, time?: string) {
    if (ObjectHelper.isEmpty(date)) {
      return null;
    }

    if (date != null && ObjectHelper.isEmpty(time)) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    } else if (date != null && !ObjectHelper.isEmpty(time)) {
      if (time!.length < 4 || time!.length > 6) {
        throw new Error('invalid value!');
      }

      if (time!.length === 4) {
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          Number(time!.substring(0, 2)),
          Number(time!.substring(2, 4))
        );
      } else {
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          Number(time!.substring(0, 2)),
          Number(time!.substring(2, 4)),
          Number(time!.substring(4, 6))
        );
      }
    }

    return null;
  }

  public static fromDateTime(dateTime: Date) {
    if (dateTime === null) {
      return null;
    }

    return new Date(
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate(),
      dateTime.getHours(),
      dateTime.getMinutes(),
      dateTime.getSeconds(),
      dateTime.getMilliseconds()
    );
  }

  public static getTime(dateTime: Date, isUsingSeconds?: boolean): string | null {
    if (dateTime === null) {
      return null;
    }
    let string = '';
    if (isUsingSeconds) {
      string = (
        (dateTime.getHours() < 10
          ? '0' + dateTime.getHours()
          : dateTime.getHours()) +
        '' +
        (dateTime.getMinutes() < 10
          ? '0' + dateTime.getMinutes()
          : dateTime.getMinutes()) +
        '' +
        (dateTime.getSeconds() < 10
          ? '0' + dateTime.getSeconds()
          : dateTime.getSeconds())
      );
    } else {
      string = (
        (dateTime.getHours() < 10
          ? '0' + dateTime.getHours()
          : dateTime.getHours()) +
        '' +
        (dateTime.getMinutes() < 10
          ? '0' + dateTime.getMinutes()
          : dateTime.getMinutes())
      );
    }
    return string;
  }

  public static isDateEquals(date1: Date, date2: Date) {
    if (date1 === null && date2 === null) {
      return true;
    } else if (date1 !== null && date2 === null) {
      return false;
    } else if (date1 === null && date2 !== null) {
      return false;
    }

    return date1.getTime() == date2.getTime();
  }

  public static isDateAfter(startDate: Date, endDate: Date) {
    if (startDate === null || endDate === null) {
      return false;
    }
    return startDate.getTime() - endDate.getTime() > 0 ? true : false;
  }

  public static isDateAfterOrEqual(startDate: Date, endDate: Date) {
    if (startDate === null || endDate === null) {
      return false;
    }
    return startDate.getTime() - endDate.getTime() >= 0 ? true : false;
  }

  public static isDateBefore(startDate: Date, endDate: Date) {
    if (startDate === null || endDate === null) {
      return false;
    }
    return startDate.getTime() - endDate.getTime() < 0 ? true : false;
  }

  public static isDateBeforeOrEqual(startDate: Date, endDate: Date) {
    if (startDate === null || endDate === null) {
      return false;
    }
    return startDate.getTime() - endDate.getTime() <= 0 ? true : false;
  }

  public static isDateTimeBefore(
    startDate: Date,
    startTime: string,
    endDate: Date,
    endTime: string
  ) {
    if (
      startDate === null ||
      endDate === null ||
      ObjectHelper.isEmpty(startTime) ||
      ObjectHelper.isEmpty(endTime)
    ) {
      return false;
    }

    if (this.isDateBefore(endDate, startDate)) {
      if (Number(startTime) < Number(endTime)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (Number(startTime) > Number(endTime)) {
        return false;
      } else {
        return true;
      }
    }
  }

  public static isMax31Days(start: Date, end: Date) {
    if (start === null || end === null) {
      return false;
    }

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(
      Math.abs((start.getTime() - end.getTime()) / oneDay)
    );

    return diffDays < 31 ? true : false;
  }

  public static substractDays(date: Date, numberOfDays: number): Date {
    const numberOfDaysInSecond = 24 * 60 * 60 * 1000 * numberOfDays;
    date.setTime(date.getTime() - numberOfDaysInSecond);
    return date;
  }

  public static addDays(date: Date, numberOfDays: number): Date {
    const numberOfDaysInSecond = 24 * 60 * 60 * 1000 * numberOfDays;
    date.setTime(date.getTime() + numberOfDaysInSecond);
    return date;
  }


  public static addMonth(yearMonth: string | Date, numberOfMonth: number): Date | undefined {
    let date;
    if (yearMonth instanceof Date) {
      date = new Date(yearMonth);
      date.setMonth(date.getMonth() + numberOfMonth);
    } else {
      try {
        const prefix = yearMonth.substring(0, 4) + '/' + yearMonth.substring(4, 6);
        date = new Date(prefix);
        date.setMonth(date.getMonth() + numberOfMonth);
      } catch (e) { }
    }
    return date;
  }

  public static isTimeBefore(startTime: string, endTime: string) {
    if (ObjectHelper.isEmpty(startTime) || ObjectHelper.isEmpty(endTime)) {
      return false;
    }

    if (Number(startTime) < Number(endTime)) {
      return true;
    } else {
      return false;
    }
  }

  public static isTimeBeforeOrEqual(startTime: string, endTime: string) {
    if (ObjectHelper.isEmpty(startTime) || ObjectHelper.isEmpty(endTime)) {
      return false;
    }

    if (Number(startTime) <= Number(endTime)) {
      return true;
    } else {
      return false;
    }
  }

  public static isTimeAfter(startTime: string, endTime: string) {
    if (ObjectHelper.isEmpty(startTime) || ObjectHelper.isEmpty(endTime)) {
      return false;
    }

    if (Number(startTime) > Number(endTime)) {
      return true;
    } else {
      return false;
    }
  }

  public static isTimeAfterOrEqual(startTime: string, endTime: string) {
    if (ObjectHelper.isEmpty(startTime) || ObjectHelper.isEmpty(endTime)) {
      return false;
    }

    if (Number(startTime) >= Number(endTime)) {
      return true;
    } else {
      return false;
    }
  }


  public static getHourDifference(date1: Date, date2: Date) {
    return Math.abs(date1.getTime() - date2.getTime()) / 36e5;
  }

  public static getYearMonth(param: Date): string {
    if (ObjectHelper.isEmpty(param)) {
      return '';
    }

    const date = new Date(param);
    const year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
      month = '0' + month;
    }

    return year + month;
  }

  public static convertMinuteToHour(minutesInput: number) {
    if (minutesInput === null) {
      return null;
    }

    const hours = (minutesInput / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);

    return {
      hours: rhours,
      minutes: rminutes
    }

  }

  public static getDayNameFromDate(param: Date) {
    if (ObjectHelper.isEmpty(param)) {
      return null;
    }

    const date = new Date(param);
    const weekday = new Array(7);
    weekday[0] = 'Minggu';
    weekday[1] = 'Senin';
    weekday[2] = 'Selasa';
    weekday[3] = 'Rabu';
    weekday[4] = 'Kamis';
    weekday[5] = 'Jumat';
    weekday[6] = 'Sabtu';

    return weekday[date.getDay()];
  }

  public static newDate(param: any) {
    if (ObjectHelper.isEmpty(param)) {
      return null;
    }

    return new Date(param);
  }

  public static isMaxDate(date: Date): boolean {
    if (this.isDateEquals(this.getMaxDate(), new Date(date))) {
      return true;
    }
    else {
      return false;
    }
  }

  public static getGajiIDTimezoneOffset() {
    const timezoneOffset = Number('+0700'.substr(1, 2));
    return timezoneOffset;
  }

  public static getIsoStringServerTimezone(date: any, localTime: boolean): string {
    const offset = Number('+0700'.substr(1, 2));
    const format = moment(date).utcOffset(offset, localTime).format();
    return format;
  }

  public static replaceTimezoneIsoString(isoString: string): string {
    /**
     * IsoString BE : 2019-02-01T00:00:00+07:00
     */
    const offset = moment().utcOffset();
    const utcOffset = Math.floor(Math.abs(offset) / 60);
    const modUtcOffset = Math.abs(offset) % 60;
    const isSubtract = offset < 0 ? true : false;
    const replacedIsoString = isoString.substr(0, 19) + (isSubtract ? '-' : '+') + (utcOffset < 10 ? '0' : '') + utcOffset + ':' + (modUtcOffset < 10 ? '0' : '') + modUtcOffset;
    return replacedIsoString;
  }

  public static isDateBetween(date: Date, startDate: Date, endDate: Date): boolean {
    const check = this.fromDate(date, '000000');
    const compareStart = this.fromDate(startDate, '000000');
    const compareEnd = this.fromDate(endDate, '000000');

    if (check! >= compareStart! && check! <= compareEnd!) {
      return true;
    } else {
      return false;
    }
  }
}
