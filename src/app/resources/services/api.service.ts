import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const OPEN_API_PROVINSI_INDONESIA = 'https://ibnux.github.io/data-indonesia/'
const OPEN_API_BANK = 'https://gist.githubusercontent.com/muhammadyana/6abf8480799637b4082359b509410018/raw/dc4aae6808285aea032a3971b3e78c497881aa23/indonesia-bank.json'


@Injectable({
    providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // open source data provinsi s/d kelurahan indonesia
  // https://ibnux.github.io/data-indonesia/contoh.html
  public getProvinsi(): Observable<any> {
    return this.http.get(OPEN_API_PROVINSI_INDONESIA + 'provinsi.json').pipe(map(res => res));
  }

  public getKabupaten(code:string): Observable<any> {
    return this.http.get(OPEN_API_PROVINSI_INDONESIA + code + '.json').pipe(map(res => res));
  }

  public getKecamatan(code:string): Observable<any> {
    return this.http.get(OPEN_API_PROVINSI_INDONESIA + code + '.json').pipe(map(res => res));
  }
  
  public getKelurahan(code:string): Observable<any> {
    return this.http.get(OPEN_API_PROVINSI_INDONESIA + code + '.json').pipe(map(res => res));
  }

  // open source data bank
  public getBank(): Observable<any> {
    return this.http.get(OPEN_API_BANK).pipe(map(res => res));
  }
}
