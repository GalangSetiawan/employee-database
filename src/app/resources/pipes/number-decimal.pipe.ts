import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'decimal', pure: true })
export class NumberDecimalPipe implements PipeTransform {
  constructor() { }
  public transform(value: string): string {
    const decimal = new RegExp('^[1-9]\d{0,2}$');
    try {
      if (value === null || value === '') {
        return '';
      }

      // @ts-ignore
      return decimal.test(value);

    } catch (e) {
      return 'undefined';
    }
  }

}
