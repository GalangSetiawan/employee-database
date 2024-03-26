import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FakeService {

  constructor(private http: HttpClient) { }

  getFakeLoginCredential() {
    return this.http.get('/assets/fake-data-json/login-credential.json');
  }

  getFakeEmployee() {
    return this.http.get('/assets/fake-data-json/employee-data.json');
  }

}