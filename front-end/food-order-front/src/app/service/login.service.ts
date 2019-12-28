import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  sendCredential(username: string, password: string) {
    const url = 'http://localhost:8080/token';
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded',
        Authorization : basicHeader
    });
    return this.httpClient.get(url, {headers});
  }

  checkSession() {
    console.log('CHECK SESSION CALLED');
    const url = 'http://localhost:8080/checkSession';
    const headers = new HttpHeaders({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.httpClient.get(url, {headers});
  }
}
