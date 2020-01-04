import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../constants/app-const';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serverPath: string = AppConst.serverPath;

  constructor(private httpClient: HttpClient) {
  }

  newUser(username: string, email: string) {
    const url = this.serverPath + '/user/newUser';
    const userInfo = {
      'username': username,
      'email': email
    };
    const tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(url, JSON.stringify(userInfo), {headers: tokenHeader, responseType: 'text'});
  }

  retrievePassword(email: string) {
    const url = this.serverPath + '/user/forgetPassword';
    const userInfo = {
      email: email
    };
    const tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.httpClient.post(url, JSON.stringify(userInfo), {headers: tokenHeader, responseType: 'text'});
  }
}
