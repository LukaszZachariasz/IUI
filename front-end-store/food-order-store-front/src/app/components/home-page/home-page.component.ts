import {Component, OnInit} from '@angular/core';
import {FoodService} from '../../services/food.service';
import {Food} from '../../models/food';
import {Observable, Subscription, interval} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private foodList: Food[] = [];
  private food
  private interval: Subscription;

  constructor(private foodService: FoodService) {
  }

  ngOnInit() {
    this.interval = interval(5000).subscribe(() => {
      this.foodService.getFoodByDayTime().subscribe(
        res => {
          console.log(res);
          this.foodList = JSON.parse(res);
        },
        error => {
          console.log(error);
        });
    });
  }

}
