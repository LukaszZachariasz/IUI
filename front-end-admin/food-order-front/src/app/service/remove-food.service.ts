import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class RemoveFoodService {

  constructor(private httpClient: HttpClient) {
  }

  removeFood(foodId: number) {
    const url = AppConst.serverPath + '/food/remove';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, foodId, {headers, responseType: 'text'});
  }
}
