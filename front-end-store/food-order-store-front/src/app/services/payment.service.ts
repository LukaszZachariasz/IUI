import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserPayment} from '../models/user-payment';
import {AppConst} from '../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {
  }

  newPayment(payment: UserPayment) {
    const url = AppConst.serverPath + '/payment/add';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    console.log(payment);
    return this.httpClient.post(url, JSON.stringify(payment), {headers, responseType: 'text'});
  }

  getUserPaymentList() {
    const url = AppConst.serverPath + '/payment/getUserPaymentList';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.get(url, {headers, responseType: 'text'});
  }

  removePayment(id: number) {
    const url = AppConst.serverPath + '/payment/remove';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, id, {headers, responseType: 'text'});
  }

  setDefaultPayment(id: number) {
    const url = AppConst.serverPath + '/payment/setDefault';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, id, {headers, responseType: 'text'});
  }
}
