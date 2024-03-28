import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  public static number: ValidatorFn =
    function (control: AbstractControl): { [key: string]: any } {
      const numberRegex: RegExp = new RegExp(/^(0|[1-9][0-9]*)$/);
      if (control.value === null || control.value === '') {
        return null!;
      } else {
        const valid = numberRegex.test(control.value);
        return valid ? null! : { 'number': { value: control.value } };
      }
    };

  public static decimal: ValidatorFn =
    function (control: AbstractControl): { [key: string]: any } {
      const decimalRegex: RegExp = new RegExp(/^(0|[1-9]\d*)((\.\d+)|(\,\d+))?$/);
      if (control.value === null || control.value === '') {
        return null!;
      } else {
        const valid = decimalRegex.test(control.value);
        return valid ? null! : { 'decimal': { value: control.value } };
      }
    };

  public static accountNumber: ValidatorFn =
    function (control: AbstractControl): { [key: string]: any } {
      const accountNumberRegex: RegExp = new RegExp(/^\d+$/);
      if (control.value === null || control.value === '') {
        return null!;
      } else {
        const valid = accountNumberRegex.test(control.value);
        return valid ? null! : { 'accountNumber': { value: control.value } };
      }
    };

  // Credit : http://emailregex.com/
  public static email: ValidatorFn =
    function (control: AbstractControl): { [key: string]: any } {
      const emailRegex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (control.value === null || control.value === '') {
        return null!;
      } else {
        const valid = emailRegex.test(control.value);
        return valid ? null! : { 'email': { value: control.value } };
      }
    };

  public static npwpNumber: ValidatorFn =
    function (control: AbstractControl): { [key: string]: any } {
      const accountNumberRegex: RegExp = new RegExp(/^([0-9][0-9].[0-9][0-9][0-9].[0-9][0-9][0-9].[0-9]-[0-9][0-9][0-9].[0-9][0-9][0-9])$/);
      if (control.value === null || control.value === '') {
        return null!;
      } else {
        const valid = accountNumberRegex.test(control.value);
        return valid ? null! : { 'npwpNumber': { value: control.value } };
      }
    };

  public static checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null!;
    }
  };
}
