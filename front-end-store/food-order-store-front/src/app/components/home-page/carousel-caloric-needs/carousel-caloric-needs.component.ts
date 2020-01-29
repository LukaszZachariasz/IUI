import {Component, Input, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {FoodService} from '../../../services/food.service';
import {Food} from '../../../models/food';
import {AppConst} from '../../../constants/app-const';
import {Router} from '@angular/router';


@Component({
  selector: 'app-carousel-caloric-needs',
  templateUrl: './carousel-caloric-needs.component.html',
  styleUrls: ['./carousel-caloric-needs.component.css']
})
export class CarouselCaloricNeedsComponent implements OnInit {

  private imageServerPath = AppConst.imageServerPath;
  private extension = AppConst.extension;
  private timeInterval = AppConst.fetchFoodByDayTimeInterval;
  private carouselIntervalChange = AppConst.carouselIntervalChange;

  @Input() private canSuggest: boolean;

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
    this.foodService.getDailyFoodSetCaloricNeeded().subscribe(
      res => {
        this.foodList = JSON.parse(res);

        console.log(JSON.parse(res));
      },
      error => {
        console.log(error);
      });
  }

  onSelect(food: Food) {
    this.router.navigate(['/foodDetail', food.id]);
  }
}
