import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetFoodService {

  constructor(private httpClient: HttpClient) {
  }

  getFood(id: number) {
    const url = 'http://localhost:8080/food/' + id;

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
