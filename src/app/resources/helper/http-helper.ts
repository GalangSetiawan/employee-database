import { TimeHelper } from './time-helper';

import * as moment from 'moment';

export class HttpHelper {

  private static regexDateWithGmtMilisecondValue = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})[+-](\d{2})\:(\d{2})/;
  private static regexDateWithGmtValue = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/;
  private static regexDateWithZValue = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z/;

  public static isISO8601Date(object: any): boolean {
    const momentDate = moment(object, moment.ISO_8601, true);
    if (momentDate.isValid() &&
        (String(object).match(HttpHelper.regexDateWithGmtValue) ||
         String(object).match(HttpHelper.regexDateWithGmtMilisecondValue) ||
         String(object).match(HttpHelper.regexDateWithZValue))) {
        return true;
      } else {
        return false;
      }
  }

  public static mapISO8601StringToDate(model: any): void {
    if (model instanceof Array) {
      HttpHelper.mapISO8601StringToDateArray(model);
    } else if (model instanceof Object === true) {
      for (const prop in model) {
        if (model[prop] !== undefined && typeof model[prop] !== 'function') {
          if (HttpHelper.isISO8601Date(model[prop])) {
            model[prop] = moment(TimeHelper.replaceTimezoneIsoString(model[prop])).toDate();
          } else {
            if (model[prop] instanceof Object === true) {
              HttpHelper.mapISO8601StringToDate(model[prop]);
            }
          }
        }
      }
    } else {
      if (HttpHelper.isISO8601Date(model)) {
        model = moment(TimeHelper.replaceTimezoneIsoString(model)).toDate();
      }
    }
  }

  private static mapISO8601StringToDateArray(model: any[]): void {
    for (const prop in model) {
      const currVal: any = model[prop];
      HttpHelper.mapISO8601StringToDate(currVal);
    }
  }

  public static mapTimezoneToDateField(model: any) {
    if (model instanceof Array) {
      HttpHelper.mapTimezoneToDateFieldArray(model);
    } else if (model instanceof Object === true) {
      for (const prop in model) {
        if (model[prop] !== undefined && typeof model[prop] !== 'function') {
          if (model[prop] instanceof Date || moment.isDate(model[prop])) {
            model[prop] = TimeHelper.getIsoStringServerTimezone(model[prop], true);
          } else {
            if (model[prop] instanceof Object === true) {
              HttpHelper.mapTimezoneToDateField(model[prop]);
            }
          }
        }
      }
    } else {
      if (model instanceof Date || moment.isDate(model)) {
        model = TimeHelper.getIsoStringServerTimezone(model, true);
      }
    }
  }

  public static mapTimezoneToDateFieldArray(model: any[]) {
    for (const prop in model) {
      const currVal: any = model[prop];
      HttpHelper.mapTimezoneToDateField(currVal);
    }
  }

}
