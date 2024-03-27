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

  getStatusPtkp() {
    return this.http.get('/assets/fake-data-json/status-ptkp.json');
  }

  getStatusPernikahan() {
    return this.http.get('/assets/fake-data-json/status-pernikahan.json');
  }

  getJenisKelamin() {
    return this.http.get('/assets/fake-data-json/gender.json');
  }

  getStatusKepegawaian() {
    return this.http.get('/assets/fake-data-json/employee-status.json');
  }

  getAgama() {
    return this.http.get('/assets/fake-data-json/agama.json');
  }
}