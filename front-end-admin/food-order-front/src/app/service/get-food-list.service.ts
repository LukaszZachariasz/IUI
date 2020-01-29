import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class GetFoodListService {

  constructor(private httpClient: HttpClient) {
  }


  getFoodList() {
    const url = AppConst.serverPath + '/food/foodList';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.get(url, {headers, responseType: 'text'});
  }

}
