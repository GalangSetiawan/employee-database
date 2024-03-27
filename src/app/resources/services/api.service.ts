import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'https://reqres.in';
const API_PROVINSI_INDONESIA = 'https://ibnux.github.io/data-indonesia/'

@Injectable({
    providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public get(url:string): Observable<any> {
    return this.http.get(API_URL + '/api/' + url).pipe(map(res => res));
  }

  public getProvinsi(): Observable<any> {
    return this.http.get(API_PROVINSI_INDONESIA + 'provinsi.json').pipe(map(res => res));
  }
  
}
