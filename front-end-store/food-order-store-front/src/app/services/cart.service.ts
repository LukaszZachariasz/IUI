import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppConst} from '../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private serverPath = AppConst.serverPath;

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  additem(id: number, qty: number) {
    const url = this.serverPath + '/cart/add';
    const cartItemInfo = {id, qty};

    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, cartItemInfo, {headers, responseType: 'text'});
  }

  getCartItemList() {
    const url = this.serverPath + '/cart/getCartItemList';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.get(url, {headers, responseType: 'text'});
  }

  getShoppingCart() {
    const url = this.serverPath + '/cart/getShoppingCart';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.get(url, {headers, responseType: 'text'});
  }

  updateCartItem(cartItemId: number, qty: number) {
    const url = this.serverPath + '/cart/updateCartItem';

    const cartItemInfo = {cartItemId, qty};

    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, cartItemInfo, {headers, responseType: 'text'});
  }

  removeCartItem(cartItemId: number) {
    const url = this.serverPath + '/cart/removeItem';

    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, cartItemId, {headers, responseType: 'text'});
  }

}
