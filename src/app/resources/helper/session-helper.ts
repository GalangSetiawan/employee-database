import * as lzstring from 'lz-string';

import { HttpHelper } from './http-helper';
import { ObjectHelper } from './object-helper';

export type lzStringServiceStub = number[];

export class SessionHelper {

  public static setItem(sessionKey: string, data: any, lzStringService?: lzStringServiceStub) {
    HttpHelper.mapTimezoneToDateField(data);
    let sessionData = JSON.stringify(data);
    if (!ObjectHelper.isEmpty(lzStringService)) {
      sessionData = lzstring.compress(sessionData);
    }

    sessionStorage.setItem(sessionKey, sessionData);
  }

  public static getItem(sessionKey: string, lzStringService?: lzStringServiceStub): any {
    if (!ObjectHelper.isEmpty(lzStringService)) {
      const item = JSON.parse(lzstring.decompress(sessionStorage.getItem(sessionKey)!) || '{}');
      HttpHelper.mapISO8601StringToDate(item);
      return item;
    }

    const item = JSON.parse(sessionStorage.getItem(sessionKey || '{}')!);
    HttpHelper.mapISO8601StringToDate(item);
    return item;
  }

  public static getItemAndDestroy(sessionKey: string, lzStringService?: lzStringServiceStub): any {
    const item = this.getItem(sessionKey, lzStringService);
    this.destroy(sessionKey);

    return item;
  }

  public static destroy(sessionKey: string) {
    sessionStorage.removeItem(sessionKey);
  }

  public static setLocalItem(sessionKey: string, data: any, lzStringService?: lzStringServiceStub) {
    HttpHelper.mapTimezoneToDateField(data);
    let sessionData = JSON.stringify(data);
    if (!ObjectHelper.isEmpty(lzStringService)) {
      sessionData = lzstring.compress(sessionData);
    }

    localStorage.setItem(sessionKey, sessionData);
  }

  public static getLocalItem(sessionKey: string, lzStringService?: lzStringServiceStub): any {
    if (!ObjectHelper.isEmpty(lzStringService)) {
      const item = JSON.parse(lzstring.decompress(localStorage.getItem(sessionKey)!) || '{}');
      HttpHelper.mapISO8601StringToDate(item);
      return item;
    }

    const item = JSON.parse(localStorage.getItem(sessionKey || '{}')!);
    HttpHelper.mapISO8601StringToDate(item);
    return item;
  }

  public static getLocalItemAndDestroy(sessionKey: string, lzStringService?: lzStringServiceStub): any {
    const item = this.getLocalItem(sessionKey, lzStringService);
    this.destroyLocal(sessionKey);

    return item;
  }

  public static destroyLocal(sessionKey: string) {
    localStorage.removeItem(sessionKey);
  }
}
