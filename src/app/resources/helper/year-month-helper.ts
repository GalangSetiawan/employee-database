import { ObjectHelper } from './object-helper';

export class YearMonthHelper {

  public static convertFromMMYYYY(MMYYYY: any){
    if(!ObjectHelper.isEmpty(MMYYYY)){
      if(MMYYYY.includes('/')){
        var plain = (MMYYYY.split('/'));
        var year = plain[1];
        var month = plain[0];
        return year + month;
      }else{
        return MMYYYY;
      }
    }else{  
      return MMYYYY;
    }
  }

  public static getValueWithoutPunctution(value: string | Date) {
    try {
      if (value === null || value === '') {
        return null;
      }

      if (value instanceof Date) {
        return String(value.getFullYear()) + ((value.getMonth() + 1) < 10 ? '0' : '') + (value.getMonth() + 1);
      } else {
        return String(value.substring(0, 4)) + String(value.substring(4, 6));
      }
    } catch (e) {
      return 'undefined';
    }
  }

  public static getCurrentYearMonth(date?: Date) {
    return YearMonthHelper.getValueWithoutPunctution(date ? date : new Date());
  }

  public static getMonth(yearMonth: string): number | null {
    if (ObjectHelper.isEmpty(yearMonth)) {
      return null;
    }

    return Number(yearMonth.substring(4, 6));
  }

  public static getYear(yearMonth: string): number | null {
    if (ObjectHelper.isEmpty(yearMonth)) {
      return null;
    }

    return Number(yearMonth.substring(0, 4));
  }

  public static getFourDigitYearFromDate(date: Date): number | null {
    if (ObjectHelper.isEmpty(date)) {
      return null;
    }

    return date.getFullYear();
  }

  public static shortFormat(yearMonth: string): any {
    if (yearMonth === null) {
      return null;
    }
    if (yearMonth.length != 6) {
      return null;
    }

    const year: number = Number(yearMonth.substring(0, 4));
    const month: number = Number(yearMonth.substring(4, 6));

  
      let strMonth: string = '';
      if (month == 1) {
        strMonth = 'Jan';
      } else if (month == 2) {
        strMonth = 'Feb';
      } else if (month == 3) {
        strMonth = 'Mar';
      } else if (month == 4) {
        strMonth = 'Apr';
      } else if (month == 5) {
        strMonth = 'May';
      } else if (month == 6) {
        strMonth = 'Jun';
      } else if (month == 7) {
        strMonth = 'Jul';
      } else if (month == 8) {
        strMonth = 'Aug';
      } else if (month == 9) {
        strMonth = 'Sep';
      } else if (month == 10) {
        strMonth = 'Oct';
      } else if (month == 11) {
        strMonth = 'Nov';
      } else if (month == 12) {
        strMonth = 'Dec';
      } else {
        console.error('5. [Unknown error] year month tidak valid =>', yearMonth);
        return null;
      }

      return strMonth + ' ' + year;
    
  }


  public static format(yearMonth: string): any {
    if (yearMonth === null) {
      return null;
    }
    if (yearMonth.length != 6) {
      return null;
    }

    const year: number = Number(yearMonth.substring(0, 4));
    const month: number = Number(yearMonth.substring(4, 6));

      let strMonth: string = '';
      if (month == 1) {
        strMonth = 'Januari';
      } else if (month == 2) {
        strMonth = 'Februari';
      } else if (month == 3) {
        strMonth = 'Maret';
      } else if (month == 4) {
        strMonth = 'April';
      } else if (month == 5) {
        strMonth = 'Mei';
      } else if (month == 6) {
        strMonth = 'Juni';
      } else if (month == 7) {
        strMonth = 'Juli';
      } else if (month == 8) {
        strMonth = 'Agustus';
      } else if (month == 9) {
        strMonth = 'September';
      } else if (month == 10) {
        strMonth = 'Oktober';
      } else if (month == 11) {
        strMonth = 'November';
      } else if (month == 12) {
        strMonth = 'Desember';
      } else {
        console.error('5. [Unknown error] year month tidak valid =>', yearMonth);
        return null;
      }

      return strMonth + ' ' + year;
    
  }

  public static toDateFormat(yearMonth: string) : Date {
    const prefix = yearMonth.substring(0,4) + '/' + yearMonth.substring(4,6);
    return new Date(prefix);
  }

  public static isValidYearMonth(yearMonth: string): Boolean {
    // Cek length
    if (yearMonth.length != 6) {
      return false;
    }

    // Cek number
    if (isNaN(Number(yearMonth))) {
      return false;
    }

    // Cek month
    try {
      const month: number = Number(yearMonth.substring(4, 6));
			if (month < 1 || month > 12)
      {
				return false;
      }
		} catch (e) {
			return false;
		}
    return true;
  }
}
