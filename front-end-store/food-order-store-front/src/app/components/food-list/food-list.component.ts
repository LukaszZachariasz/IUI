import {Component, OnInit} from '@angular/core';
import {FoodService} from '../../services/food.service';
import {Food} from '../../models/food';
import {AppConst} from '../../constants/app-const';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {

  public filterQuery = '';
  public rowsOnPage = 5;

  private selectedFood: Food;
  private foodList: Food[];
  private serverPath = AppConst.serverPath;

  constructor(private foodService: FoodService,
              private router: Router,
              private httpClient: HttpClient,
              private route: ActivatedRoute) {
  }

  onSelect(food: Food) {
    this.selectedFood = food;
    this.router.navigate(['/foodDetail', this.selectedFood.id]);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params['foodList']) {
          console.log('Filtered Food List');
          this.foodList = JSON.parse(params['foodList']);
        } else {
          this.foodService.getFoodList().subscribe(
            res => {
              console.log(res);
              this.foodList = JSON.parse(res);
            },
            error => {
              console.log(error);
            });
        }
      });
  }

}
