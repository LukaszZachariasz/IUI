import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {FoodService} from '../../../services/food.service';
import {Food} from '../../../models/food';
import {AppConst} from '../../../constants/app-const';
import {Router} from '@angular/router';


@Component({
  selector: 'app-carousel-day-time',
  templateUrl: './carousel-day-time.component.html',
  styleUrls: ['./carousel-day-time.component.css']
})
export class CarouselDayTimeComponent implements OnInit {

  private imageServerPath = AppConst.imageServerPath;
  private extension = AppConst.extension;
  private timeInterval = AppConst.fetchFoodByDayTimeInterval;
  private carouselIntervalChange = AppConst.carouselIntervalChange;


  private foodList: Food[] = [];
  private interval: Subscription;

  constructor(private foodService: FoodService,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchFood();
    this.interval = interval(this.timeInterval).subscribe(() => {
      this.fetchFood();
    });
  }

  fetchFood() {
    this.foodService.getFoodByDayTime().subscribe(
      res => {
        console.log(res);
        this.foodList = JSON.parse(res);
      },
      error => {
        console.log(error);
      });
  }

  onSelect(food: Food) {
    this.router.navigate(['/foodDetail', food.id]);
  }
}
