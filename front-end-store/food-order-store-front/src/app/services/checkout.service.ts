import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BillingAddress} from '../models/billing-address';
import {ShippingAddress} from '../models/shipping-address';
import {AppConst} from '../constants/app-const';
import {PaymentOrder} from '../models/payment-order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private serverPath = AppConst.serverPath;

  constructor(private httpClient: HttpClient) {
  }

  checkout(shippingAddress: ShippingAddress,
           billingAddress: BillingAddress,
           payment: PaymentOrder,
           shippingMethod: string) {

    const order = {
      shippingAddress,
      billingAddress,
      payment,
      shippingMethod
    };

    const url = this.serverPath + '/checkout/checkout';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    console.log(order);
    return this.httpClient.post(url, order, {headers, responseType: 'text'});
  }

  getUserOrder() {
    const url = this.serverPath + '/checkout/getUserOrder';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.get(url, {headers, responseType: 'text'});
  }

}
