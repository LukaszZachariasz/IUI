import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../constants/app-const';
import {User} from '../models/user';


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
    });

    return this.httpClient.post(url, JSON.stringify(userInfo), {headers: tokenHeader, responseType: 'text'});
  }

  updateUserInfo(user: User, newPass: string, currPass) {

    const userInfo = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      height: user.height,
      currentPassword: currPass,
      newPassword: newPass,
      weight: user.weight,
      phoneNumber: user.phoneNumber,
      username: user.username,
      birthDate: user.dateOfBirth
    };

    const url = this.serverPath + '/user/updateUserInfo';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, userInfo, {headers, responseType: 'text'});
  }

  getCurrentUser() {
    const url = this.serverPath + '/user/getCurrentUser';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });
    return this.httpClient.get(url, {headers, responseType: 'text'});
  }
}
