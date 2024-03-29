import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionHelper } from '../helper/session-helper';

@Injectable()
export class FakeService {

  public isUserLogin = false;

  constructor(private http: HttpClient) { }

  public checkIsUserLogin(){
    var isLogin = SessionHelper.getItem('USER_HAS_LOGGED_IN');
    this.isUserLogin = isLogin;
    return this.isUserLogin;
  }

  public setLoggedIn(){
    this.isUserLogin = true;
    SessionHelper.setItem('USER_HAS_LOGGED_IN', this.isUserLogin);
  }

  public logout(){
    this.isUserLogin = false;
    SessionHelper.destroy('USER_HAS_LOGGED_IN');

  }

  public getFakeLoginCredential() {
    return this.http.get('/assets/fake-data-json/login-credential.json');
  }

  public getFakeEmployee() {
    return this.http.get('/assets/fake-data-json/employee-data.json');
  }

  public getStatusPtkp() {
    return this.http.get('/assets/fake-data-json/status-ptkp.json');
  }

  public getStatusPernikahan() {
    return this.http.get('/assets/fake-data-json/status-pernikahan.json');
  }

  public getJenisKelamin() {
    return this.http.get('/assets/fake-data-json/gender.json');
  }

  public getStatusKepegawaian() {
    return this.http.get('/assets/fake-data-json/employee-status.json');
  }

  public getAgama() {
    return this.http.get('/assets/fake-data-json/agama.json');
  }

  public getDepartemen() {
    return this.http.get('/assets/fake-data-json/departemen.json');
  }


}