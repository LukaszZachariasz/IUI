import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../constants/app-const';
import {UserShipping} from '../models/user-shipping';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private httpClient: HttpClient) { }

  newShipping(shipping: UserShipping) {
    const url = AppConst.serverPath + '/shipping/add';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, JSON.stringify(shipping), {headers, responseType: 'text'});
  }

  getUserShippingList() {
    const url = AppConst.serverPath + '/shipping/getUserShippingList';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.get(url, {headers, responseType: 'text'});
  }

  removeShipping(id: number) {
    const url = AppConst.serverPath + '/shipping/remove';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, id, {headers, responseType: 'text'});
  }

  setDefaultShipping(id: number) {
    const url = AppConst.serverPath + '/shipping/setDefault';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, id, {headers, responseType: 'text'});
  }
}
