import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppConst} from '../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private serverPath = AppConst.serverPath;

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }


  getFoodList() {
    const url = this.serverPath + '/food/foodList';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.get(url, {headers, responseType: 'text'});
  }

  getFood(id: number) {
    const url = this.serverPath + '/food/' + id;
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.get(url, {headers, responseType: 'text'});
  }

  searchFood(keyword: string) {
    const url = this.serverPath + '/food/searchFood';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, keyword, {headers, responseType: 'text'});
  }
}
