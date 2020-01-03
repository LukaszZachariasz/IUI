import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppConst} from '../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private serverPath = AppConst.serverPath;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  sendCredentials(username: string, password: string) {
    const url = this.serverPath + '/token';
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: basicHeader
    });
    return this.httpClient.get(url, {headers});
  }

  checkSession() {
    const url = this.serverPath + '/checkSession';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });
    return this.httpClient.get(url, {headers, responseType: 'text'});
  }

  logoutMe() {
    const url = this.serverPath + '/logoutMe';
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
