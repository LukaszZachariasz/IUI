import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Food} from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class AddNewFoodService {

  constructor(private httpClient: HttpClient) {
  }

  sendNewFood(foodPackage: Food) {
    const url = 'http://localhost:8080/food/addNew';

    const xToken = localStorage.getItem('xAuthToken');

    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': xToken,
      'Authorization': basicHeader
    });

    return this.httpClient.post(url, JSON.stringify(foodPackage), {headers, responseType: 'text'});
  }

}
