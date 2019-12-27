import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  sendCredential(username: string, password: string) {
    const url = 'http://localhost:8181/token';
    const encodedCredentials = btoa(username + ':' + password);
    let basicHeader = 'Basic ' + encodedCredentials;
    let headers = new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : basicHeader
    });

    return this.httpClient.get(url, {headers});
  }
}
