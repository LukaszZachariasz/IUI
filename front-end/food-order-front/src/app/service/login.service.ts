import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  sendCredential(username: string, password: string) {
    const url = 'http://localhost:8080/token';
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: basicHeader
    });
    return this.httpClient.get(url, {headers});
  }

  checkSession() {
    const url = 'http://localhost:8080/checkSession';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });
    return this.httpClient.get(url, {headers, responseType: 'text'});
  }

  logoutMe() {
    const url = 'http://localhost:8080/user/logoutMe';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });
    this.router.navigate(['/']).then(
      res => {
        location.reload();
      });
    localStorage.clear();
    return this.httpClient.post(url, '', {headers, responseType: 'text'});
  }
}
