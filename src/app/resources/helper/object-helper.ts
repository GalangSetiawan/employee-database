import { ValidationErrors } from '@angular/forms';
// import { GaResponse, GaMessage } from 'src/app/gaji-id-resources/gaji-id-api-response.model';

export class ObjectHelper {

  public static isEmpty(object: any): boolean {
    if (object === null || object === undefined || object === 'null') { return true; }

    if (typeof object === 'string') {
      if (object.trim() === '') { return true; }
    }

    if (object instanceof Array) {
      if (object.length === 0) { return true; }
    }

    if (object.constructor === Object) {
      if (Object.keys(object).length === 0) { return true; }
    }

    return false;
  }

  public static isFunction(object: any): boolean {
    if (typeof object === 'function') {
      return true;
    } else {
      return false;
    }
  }

  // public static getMultipleErrors(results: GaResponse<any>[]): GaMessage[] {
  //   const errors: GaMessage[] = [];
  //   results.forEach(result => {
  //     result.errors.forEach(message => {
  //       if (!message.code.startsWith('upload')) {
  //         errors.push(message);
  //       }
  //     });
  //   });
  //   return errors;
  // }

  public static trimSpace(label: string, replacedSymbol?: string) {
    if (replacedSymbol) {
      return label.trim().replace(/ /g, replacedSymbol);
    } else {
      return label.trim().replace(/ /g, "");
    }
  }

  public static composeMessageKey(message: string, errorKey: string, key: string) {
    let messageKey = 'data';
    if (!ObjectHelper.isEmpty(message)) {
      messageKey = message;
    }

    if (!ObjectHelper.isEmpty(errorKey) && errorKey.indexOf('app-') === -1) {
      messageKey = messageKey + '.' + errorKey;
    }

    if (key === 'required') {
      messageKey = messageKey + '.' + key;
    } else if (key === 'min' || key === 'max') {
      messageKey = messageKey + '.' + key + '.length';
    } else if (key === 'minlength') {
      messageKey = messageKey + '.min.length';
    } else if (key === 'maxlength') {
      messageKey = messageKey + '.max.length';
    } else if (key === 'email' || key === 'pattern') {
      messageKey = messageKey + '.invalid';
    } else if (key === 'min.value' || key === 'max.value') {
      messageKey = messageKey + '.' + key;
    } else {
      // Warning! Custom validator message not implemented yet!'
      messageKey = messageKey + '.invalid';
    }
    return messageKey;
  }

  public static composeMessageParams(message: string, key: string, errors: ValidationErrors) {
    let params: any = {};
    if (key === 'required' || key === 'email' || key === 'pattern') {
      params = null;
    } else if (key === 'minlength' || key === 'maxlength') {
      params[0] = errors[key].requiredLength;
    } else if (key === 'min' || key === 'max') {
      params[0] = errors[key][key];
    } else if (key === 'min.value' || key === 'max.value') {
      params[0] = errors[key];
    } else {
      // Warning! Custom validator message not implemented yet!'
      params = null;
    }
    return params;
  }
}
