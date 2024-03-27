import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'npwpFormat', pure: true })
export class NpwpPipe implements PipeTransform {
  constructor() { }

  public transform(value: string): string | null {
    try {
      if (value === null || value === '') {
        return null;
      }

      if (value.length < 15) {
        console.error('[Error] - Incorrect Npwp value');
        return 'undefined';
      }

      if (value.length === 20) {
        return value;
      }

      return value.substr(0, 2) + '.' + value.substr(2, 3) + '.' + value.substr(5, 3) + '.' + value.charAt(8) + '-' + value.substr(9, 3) + '.' + value.substr(12, 3);
    } catch (e) {
      return 'undefined';
    }
  }

}
